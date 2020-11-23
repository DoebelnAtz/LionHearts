import React, {
	Dispatch,
	SetStateAction,
	useState,
} from 'react';
import { useSpring } from 'react-spring';
import {
	AddDegreeButtonDiv,
	AddDegreeSideOne,
	AddDegreeSideTwo,
	AddDegreeSideTwoHalve,
	TextSpan,
} from './Styles';
import { makeRequest } from '../../../../../Api';
import { Profile } from '../../../../../@types';

type AddDegreeButtonProps = {
	name: string;
	degreeId: number;
	setProfile: Dispatch<
		SetStateAction<Profile | undefined>
	>;
	profile: Profile;
	setEditing: Dispatch<SetStateAction<boolean>>;
};

const AddDegreeButton: React.FC<AddDegreeButtonProps> = ({
	name,
	degreeId,
	setProfile,
	profile,
	setEditing,
}) => {
	const [flipped, set] = useState(false);
	const { transform, opacity } = useSpring({
		opacity: flipped ? 1 : 0,
		transform: `perspective(600px) rotateX(${
			flipped ? 180 : 0
		}deg)`,
		config: { mass: 5, tension: 500, friction: 80 },
	});

	const handleCardFlip = (e: MouseEvent) => {
		e.stopPropagation();
		set(!flipped);
	};

	const handleAddDegree = async (completed: boolean) => {
		if (flipped) {
			try {
				const addedDegree = await makeRequest(
					'/profiles/add_degree',
					'POST',
					{
						completed,
						degreeId,
					},
				);
				if (addedDegree?.data) {
					setProfile({
						...profile,
						degrees: [
							...profile.degrees,
							{
								name,
								d_id: degreeId,
								completed,
							},
						],
					});
					setEditing(false);
				}
			} catch (e) {
				console.log(e);
			}
		}
	};

	return (
		<AddDegreeButtonDiv onClick={handleCardFlip}>
			<AddDegreeSideOne
				style={{
					opacity: opacity.interpolate(
						(o) => 1 - o,
					),
					transform,
				}}
			>
				<TextSpan>{name}</TextSpan>
			</AddDegreeSideOne>
			<AddDegreeSideTwo
				style={{
					opacity,
					transform: transform.interpolate(
						(t) => `${t} rotateX(180deg)`,
					),
				}}
			>
				<AddDegreeSideTwoHalve
					onClick={() => handleAddDegree(true)}
				>
					<TextSpan>completed</TextSpan>
				</AddDegreeSideTwoHalve>
				<AddDegreeSideTwoHalve
					onClick={() => handleAddDegree(false)}
				>
					<TextSpan>ongoing </TextSpan>
				</AddDegreeSideTwoHalve>
			</AddDegreeSideTwo>
		</AddDegreeButtonDiv>
	);
};

export default AddDegreeButton;
