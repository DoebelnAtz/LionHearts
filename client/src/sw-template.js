

if ('function' === typeof importScripts) {
	importScripts(
		'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js',
	);
	/* global workbox */
	if (workbox) {
		let unreadCount = 0;
		console.log('Workbox is loaded');
		self.addEventListener('push', function (event) {
			console.log('[Service Worker] Push Received.');
			console.log(
				`[Service Worker] Push had this data: "${event.data.text()}"`,
			);
			unreadCount = unreadCount + 1;
			console.log(event);
			const data = event.data.json();
			console.log(data);
			const title = data.title;
			console.log(self);
			const options = {
				body: data.body,
				vibrate: [200, 100, 200, 100, 200, 100, 200],
				icon: 'notif_icon.png',
				badge: 'notif_badge.png',
				data: data.data,
			};
			self.navigator.setAppBadge(unreadCount);
			console.log(options);
			event.waitUntil(
				// @ts-ignore
				self.registration.showNotification(title, options),
			);
		});
		self.onnotificationclick = function (event) {
			console.log('On notification click: ', event.notification.tag);
			event.notification.close();
			console.log(event);
			// This looks to see if the current is already open and
			// focuses if it is
			unreadCount = unreadCount - 1;
			self.navigator.setAppBadge(unreadCount);
			event.waitUntil(
				clients
					.matchAll({
						type: 'window',
					})
					.then(function (clientList) {
						for (var i = 0; i < clientList.length; i++) {
							var client = clientList[i];
							if (
								client.url === event.notification?.data?.link ||
								('/members' && 'focus' in client)
							)
								return client.focus();
						}
						if (clients.openWindow)
							return clients.openWindow(
								event.notification?.data?.link || '/members',
							);
					}),
			);
		};
		/* injection point for manifest files.  */
		workbox.routing.registerRoute(
			new RegExp(`^https://api-dot-lionhearts-291621.ew.r.appspot.com/api/.*`),
			new workbox.strategies.NetworkFirst({
				cacheName: 'dev-build-api-cache',
			}),
		);

		workbox.routing.registerRoute(
			new RegExp(`^https://api-dot-lionhearts-291621.ew.r.appspot.com/api/photos/.*`),
			new workbox.strategies.CacheFirst({
				cacheName: 'img-cache',
			}),
		);

		workbox.routing.registerRoute(
			new RegExp(`^https://api-dot-lionhearts-291621.ew.r.appspot.com/api/languages/.*`),
			new workbox.strategies.CacheFirst({
				cacheName: 'img-cache',
			}),
		);

		workbox.routing.registerRoute(
			new RegExp('^https://lionhearts.com/api/photos/.*'),

			new workbox.strategies.CacheFirst({
				cacheName: 'img-cache',
			}),
		);

		workbox.routing.registerRoute(
			new RegExp('^https://lionhearts.com/api/langauges/.*'),

			new workbox.strategies.CacheFirst({
				cacheName: 'img-cache',
			}),
		);

		workbox.routing.registerRoute(
			new RegExp('^https://lionhearts.com/api/.*'),
			new workbox.strategies.NetworkFirst({
				cacheName: 'api-cache',
			}),
		);
		/* custom cache rules*/
		workbox.core.clientsClaim();
		workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
		workbox.routing.registerNavigationRoute(
			workbox.precaching.getCacheKeyForURL('/index.html'),
			{
				blacklist: [/^\/_/, /\/[^\/?]+\.[^\/]+$/],
			},
		);
	} else {
		console.log('Workbox could not be loaded. No Offline support');
	}
}
