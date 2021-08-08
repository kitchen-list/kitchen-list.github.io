import Source from '../../data/source';
import { createListItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return '<div class="content"><div id="lists" class="restos"></div></div>';
  },

  async afterRender() {
    const lists = await Source.home();
    const listsContainer = document.querySelector('#lists');
    lists.forEach((list) => {
      listsContainer.innerHTML += createListItemTemplate(list);
    });
  },
};

export default Home;
