import React from 'react';

const MemberIcon: React.FC = () => {
    return (
        <div>
            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 xmlnsXlink="http://www.w3.org/1999/xlink" style={{background: '#A2A2A2'}}>
                <defs>
                    <circle id="path-1" cx="11" cy="11" r="11"/>
                </defs>
                <g id="Icons-/-UI-/-Log-in-/-Basic" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <rect fill="#A2A2A2" x="0" y="0" width="24" height="24"/>
                    <circle id="Oval-Copy" stroke="#FFFFFF" strokeWidth="2" cx="12" cy="11" r="4"/>
                    <g id="Oval" transform="translate(1.000000, 1.000000)">
                        <mask id="mask-2" fill="white">
                            <use xlinkHref="#path-1"/>
                        </mask>
                        <g id="Mask"/>
                        <circle stroke="#FFFFFF" strokeWidth="2" mask="url(#mask-2)" cx="11" cy="21" r="7"/>
                    </g>
                    <circle id="Oval" stroke="#FFFFFF" strokeWidth="2" cx="12" cy="12" r="10"/>
                </g>
            </svg>
        </div>
    );
};

export default MemberIcon;