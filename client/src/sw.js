window.self.addEventListener('push', event => {
  const data = event.data.json();

  window.self.registration.showNotification(data.title, {
    body: 'notification!',
  });
});
