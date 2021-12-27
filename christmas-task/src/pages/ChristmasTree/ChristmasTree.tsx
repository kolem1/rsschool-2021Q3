import React, { useRef, useState, useContext, useEffect } from 'react';
import { MainContext } from '../../App';
import './ChristmasTree.css';
import { IToy } from '../../types/index';
import { copyObj, getImgUrl } from '../../utils/index';
import { trees, backgrounds } from './treesParam';
import { Map } from '../../components';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Garland } from '../../components/Garland/Garland';
import { ColorCheckbox } from '../../components/UI';

const colorChecks = [
  {
    id: 1,
    color: '255, 0, 0',
  },
  {
    id: 2,
    color: '0, 255, 0',
  },
  {
    id: 3,
    color: '0, 0, 255',
  },
  {
    id: 4,
    color: ['255, 0, 0', '0, 255, 0', '0, 0, 255'],
  },
];

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

  const [garlandColor, setGarlandColor] = useState(colorChecks[0]);
  const [garlandIsOn, setGarlandIsOn] = useState(false);

  const [soundIsOn, setSoundIsOn] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [firstClick, setFirstClick] = useState(false);
  useEffect(() => {
    if (!firstClick && soundIsOn) {
      const handleFirstClick = () => {
        audioRef.current?.play();
        setFirstClick(true);
        document.body.removeEventListener('click', handleFirstClick);
      };
      document.body.addEventListener('click', handleFirstClick);
    } else if (soundIsOn) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [soundIsOn, firstClick]);

  useEffect(() => {
    if (userFavorites && userFavorites.length > 0) {
      setChoosenToys(copyObj(userFavorites));
    } else if (toysData) {
      setChoosenToys(toysData.slice(0, 19));
    }
    if (choosenToys.length) {
      setTreeState(
        treeState.filter((item) => {
          return choosenToys.find((toy) => toy.num === item.toy.num);
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFavorites, toysData]);

  function determineSize(toy: IToy) {
    let size: number;
    switch (toy.size) {
      case 'большой':
        size = 50;
        break;
      case 'средний':
        size = 45;
        break;
      default:
        size = 40;
    }
    return size;
  }

  const handleTreeDrop = (e: React.DragEvent) => {
    function getCoords(tree: HTMLElement) {
      const coords = e.dataTransfer.getData('coords').split(' ');
      const treeX = tree.offsetLeft;
      const treeY = tree.offsetTop;
      const treeWidth = tree.offsetWidth;
      const treeHeight = tree.offsetHeight;
      return {
        x: ((e.pageX - treeX - Number(coords[0])) / treeWidth) * 100,
        y: ((e.pageY - treeY - Number(coords[1])) / treeHeight) * 100,
      };
    }

    e.preventDefault();
    const target = e.target as HTMLElement;
    const tree: HTMLElement | null = target.closest('.tree__img-wrapper');

    const newToy = e.dataTransfer.getData('application/newToy');

    const movedToy = e.dataTransfer.getData('application/toy');
    if (tree) {
      let toy: IToyOnTree;
      if (newToy) {
        const currentToy = choosenToys.find((t) => t.num === newToy) as IToy;
        toy = {
          id: String(new Date().getTime()),
          toy: currentToy,
          coords: getCoords(tree),
        };
        setTreeState(treeState.concat(toy));
      } else if (movedToy) {
        toy = treeState.find((currentToy) => currentToy.id === movedToy) as IToyOnTree;
        const previousState = treeState.filter((item) => item !== toy);

        setTreeState(
          previousState.concat({
            ...toy,
            coords: getCoords(tree),
          })
        );
      }
    }
  };

  return (
    <div className="tree-page">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio
        ref={audioRef}
        loop
        src="https://raw.githubusercontent.com/kolem1/stage1-tasks/christmas-task/assets/audio/audio.mp3"
      />
      <div className="container">
        <div className="tree-page__inner">
          <div className="tree-page__column">
            Музыка <input type="checkbox" checked={soundIsOn} onChange={(e) => setSoundIsOn(e.target.checked)} />
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
            <div className="tree-page__garlands">
              {colorChecks.map((check) => {
                return (
                  <ColorCheckbox
                    key={check.id}
                    value={Array.isArray(check.color) ? check.color[0] : check.color}
                    color={`rgb(${check.color})`}
                    className="filter-item"
                    checked={garlandColor === check}
                    onChange={() => {
                      setGarlandColor(check);
                    }}
                  />
                );
              })}
            </div>
            <input type="checkbox" checked={garlandIsOn} onChange={(e) => setGarlandIsOn(e.target.checked)} />
          </div>
          <div className="tree-page__column tree-page__column--tree">
            <div className="tree" style={{ background: `url(${currentBG.img}) center / cover` }}>
              <div className="tree__img-wrapper">
                <img className="tree__img" src={currentTree.img} useMap="#image-map" alt="" />
                <Map
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'copy';
                  }}
                  onDrop={handleTreeDrop}
                  coords={currentTree.coords}
                />
                {garlandIsOn ? (
                  <div className="tree__garland">
                    <Garland
                      width={500}
                      height={700}
                      minAngle={1.2}
                      maxAngle={Math.PI - 1.2}
                      startPos={100}
                      color={garlandColor.color}
                    />
                  </div>
                ) : (
                  ''
                )}
                {treeState.map((toy) => {
                  const isChoosen = choosenToys.some((item) => item.num === toy.toy.num);
                  if (!isChoosen) {
                    return '';
                  }
                  const size = determineSize(toy.toy);
                  return (
                    <img
                      key={toy.id}
                      onDragStart={(e) => {
                        e.dataTransfer.setData('coords', `${e.nativeEvent.offsetX} ${e.nativeEvent.offsetY}`);
                        e.dataTransfer.setData('application/toy', toy.id);
                      }}
                      onDragEnd={(e) => {
                        if (e.dataTransfer.dropEffect !== 'copy') {
                          setTreeState(treeState.filter((item) => item.id !== toy.id));
                        }
                      }}
                      className="tree__toy"
                      style={{
                        left: `${toy.coords.x}%`,
                        top: `${toy.coords.y}%`,
                        width: size,
                        height: size,
                      }}
                      src={getImgUrl(toy.toy.num)}
                      alt=""
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="tree-page__column">
            <h2 className="tree-page__title">Игрушки</h2>
            <div className="tree-page__grid">
              {choosenToys.map((toy) => {
                const currentCount = treeState.filter((item) => item.toy.num === toy.num).length;
                return (
                  <div className="tree-card" key={toy.num}>
                    <div className="tree-card__count">{toy.count - currentCount}</div>
                    <div className="tree-card__img-wrapper">
                      {toy.count - currentCount > 0 ? (
                        <img
                          id="img"
                          onDragStart={(e) => {
                            e.dataTransfer.setData('coords', `${e.nativeEvent.offsetX} ${e.nativeEvent.offsetY}`);
                            e.dataTransfer.setData('application/newToy', toy.num);
                          }}
                          src={getImgUrl(toy.num)}
                          alt=""
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
