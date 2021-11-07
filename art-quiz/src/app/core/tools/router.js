const router = {
  getUrl() {
    return window.location.hash.slice(2);
  },
};

export default router;
