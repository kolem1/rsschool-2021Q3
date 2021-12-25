import React, { useState, useContext, useEffect } from 'react';
import { MainContext } from '../../App';
import './ChristmasTree.css';
import { IToy } from '../../types/index';
import { copyObj, getImgUrl } from '../../utils/index';
import { trees, backgrounds } from './treesParam';
import { Map } from '../../components';
import useLocalStorage from '../../hooks/useLocalStorage';

interface IToyOnTree {
  id: string;
  toy: IToy;
  coords: { x: number; y: number };
}

export const ChrictmasTree: React.FC = function () {
  const [currentTree, setCurrentTree] = useState(trees[0]);
  const [currentBG, setCurrentBG] = useState(backgrounds[0]);
  const [treeState, setTreeState] = useLocalStorage<IToyOnTree[]>('kolem1-treeState', []);

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
                  // e.preventDefault();
                  const target = e.target as HTMLElement;
                  const newToy = e.dataTransfer.getData('application/newToy');
                  const movedToy = e.dataTransfer.getData('application/toy');
                  if (newToy) {
                    const toy = choosenToys.find((currentToy) => currentToy.num === newToy);
                    const tree: HTMLElement | null = target.closest('.tree');
                    if (tree && toy) {
                      const treeX = tree.offsetLeft;
                      const treeY = tree.offsetTop;
                      const treeWidth = tree.offsetWidth;
                      const treeHeight = tree.offsetHeight;
                      setTreeState(
                        treeState.concat({
                          id: String(new Date().getTime()),
                          toy,
                          coords: {
                            x: ((e.pageX - treeX - 20) / treeWidth) * 100,
                            y: ((e.pageY - treeY - 20) / treeHeight) * 100,
                          },
                        })
                      );
                    }
                  } else if (movedToy) {
                    const toy = treeState.find((currentToy) => currentToy.id === movedToy);
                    const tree: HTMLElement | null = target.closest('.tree');
                    if (tree && toy) {
                      const treeX = tree.offsetLeft;
                      const treeY = tree.offsetTop;
                      const treeWidth = tree.offsetWidth;
                      const treeHeight = tree.offsetHeight;
                      const currentToy = treeState.find((item) => item.id === toy.id) as IToyOnTree;
                      const previousState = treeState.filter((item) => item !== currentToy);

                      setTreeState(
                        previousState.concat({
                          ...currentToy,
                          coords: {
                            x: ((e.pageX - treeX - 20) / treeWidth) * 100,
                            y: ((e.pageY - treeY - 20) / treeHeight) * 100,
                          },
                        })
                      );
                    }
                  }
                }}
                coords={currentTree.coords}
              />
              {treeState.map((toy) => {
                const isChoosen = choosenToys.some((item) => item.num === toy.toy.num);
                if (!isChoosen) {
                  return '';
                }
                return (
                  <img
                    key={toy.id}
                    onDragStart={(e) => {
                      e.dataTransfer.setData('application/toy', toy.id);
                    }}
                    className="tree__toy"
                    style={{ left: `${toy.coords.x}%`, top: `${toy.coords.y}%` }}
                    src={getImgUrl(toy.toy.num)}
                    alt=""
                  />
                );
              })}
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
                        e.dataTransfer.setData('application/newToy', toy.num);
                        e.dataTransfer.effectAllowed = 'copy';
                      }}
                      src={getImgUrl(toy.num)}
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
