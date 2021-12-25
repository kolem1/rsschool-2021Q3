import React, { useState, useContext, useEffect } from 'react';
import { MainContext } from '../../App';
import './ChristmasTree.css';
import { IToy } from '../../types/index';
import { copyObj } from '../../utils/index';
import { trees, backgrounds } from './treesParam';
import { Map } from '../../components';

export const ChrictmasTree: React.FC = function () {
  const [currentTree, setCurrentTree] = useState(trees[0]);
  const [currentBG, setCurrentBG] = useState(backgrounds[0]);
  const [treeState, setTreeState] = useState<{ toy: IToy; coords: { x: number; y: number } }[]>([]);

  const [choosenToys, setChoosenToys] = useState<IToy[]>([]);

  const { userFavorites, toysData } = useContext(MainContext);

  useEffect(() => {
    if (userFavorites && userFavorites.length > 0) {
      setChoosenToys(copyObj(userFavorites));
    } else if (toysData) {
      setChoosenToys(toysData.filter((toy, i) => i < 20));
    }
  }, [userFavorites, toysData]);

  return (
    <div className="tree-page">
      <div className="container">
        <div className="tree-page__inner">
          <div className="tree-page__column">
            <h2 className="tree-page__title">Выберите ёлку</h2>
            <div className="tree-page__grid">
              {trees.map((tree) => (
                <button
                  type="button"
                  key={tree.id}
                  className={`tree-card${tree.id === currentTree.id ? ' active' : ''}`}
                  onClick={() => setCurrentTree(tree)}
                >
                  <div className="tree-card__img-wrapper">
                    <img className="tree-card__img" src={tree.img} alt="" />
                  </div>
                </button>
              ))}
            </div>
            <h2 className="tree-page__title">Выберите фон</h2>
            <div className="tree-page__grid">
              {backgrounds.map((bg) => (
                <button
                  type="button"
                  key={bg.id}
                  className={`tree-card${bg.id === currentBG.id ? ' active' : ''}`}
                  onClick={() => setCurrentBG(bg)}
                >
                  <div className="tree-card__img-wrapper" style={{ background: `url(${bg.img}) center / cover` }} />
                </button>
              ))}
            </div>
            <h2 className="tree-page__title">Гирлянда</h2>
          </div>
          <div className="tree-page__column tree-page__column--tree">
            <div className="tree" style={{ background: `url(${currentBG.img}) center / cover` }}>
              <img src={currentTree.img} useMap="#image-map" alt="" />
              <Map
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'copy';
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const target = e.target as HTMLElement;
                  const data = e.dataTransfer.getData('application/my-app');
                  const copyimg = document.createElement('img');
                  copyimg.classList.add('tree__toy');
                  const original = document.getElementById(data) as HTMLImageElement;
                  copyimg.src = original.src;
                  const tree: HTMLElement | null = target.closest('.tree');
                  if (tree) {
                    const treeX = tree.offsetLeft;
                    const treeY = tree.offsetTop;
                    const treeWidth = tree.offsetWidth;
                    const treeHeight = tree.offsetHeight;
                    copyimg.style.left = `${((e.pageX - treeX - 20) / treeWidth) * 100}%`;
                    copyimg.style.top = `${((e.pageY - treeY - 20) / treeHeight) * 100}%`;
                    tree.append(copyimg);
                  }
                }}
                coords={currentTree.coords}
              />
            </div>
          </div>
          <div className="tree-page__column">
            <h2 className="tree-page__title">Игрушки</h2>
            <div className="tree-page__grid">
              {choosenToys.map((toy) => (
                <div className="tree-card" key={toy.num}>
                  <div className="tree-card__img-wrapper">
                    <img
                      id="img"
                      onDragStart={(e) => {
                        e.dataTransfer.setData('application/my-app', (e.target as Element).id);
                        e.dataTransfer.effectAllowed = 'copy';
                      }}
                      src={`https://raw.githubusercontent.com/kolem1/stage1-tasks/christmas-task/assets/toys/${toy.num}.png`}
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
