const router = {
  getUrl() {
    return window.location.hash.slice(1);
  },
  getTopic() {
    const topic = router.getUrl().match(/\w+/);
    if (topic !== null) {
      return topic[0];
    }
    return null;
  },
  getRound() {
    const category = router.getUrl().match(/\/(\d+)/);
    if (category !== null) {
      return category[1];
    }
    return null;
  },
};

export default router;
