import router from "../routingModule/router";

export default class Game {
  constructor() {

  }

  get topic() {
    return router.getUrl().match(/\w+/);
  }

  get round() {
    const category = router.getUrl().match(/\/(\d+)/);
    if(category === null) return;
    return router.getUrl().match(/\/(\d)+/)[1]
    ;
  }
}