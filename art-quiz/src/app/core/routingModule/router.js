const router = {
  getUrl() {
    return window.location.hash.slice(1);
  },
};

export default router;
