import React, { useRef, useState, useContext, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { MainContext } from '../../App';
import './ChristmasTree.css';
import { IToy } from '../../types/index';
import { copyObj, getImgUrl } from '../../utils/index';
import { trees, backgrounds, ITree } from './treesParam';
import { Map, Snow, Garland, AudioPlayer } from '../../components';
import { Checkbox, ColorCheckbox } from '../../components/UI';
import useLocalStorage from '../../hooks/useLocalStorage';

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
  const [currentTree, setCurrentTree] = useLocalStorage('kolem1-currentTree', trees[0]);
  const [currentBG, setCurrentBG] = useLocalStorage('kolem1-currentBG', backgrounds[0]);
  const [treeState, setTreeState] = useLocalStorage<IToyOnTree[]>('kolem1-treeState', []);

  const [choosenToys, setChoosenToys] = useState<IToy[]>([]);

  const { userFavorites, toysData, setFavoriteToys } = useContext(MainContext);

  const [garlandColor, setGarlandColor] = useState(colorChecks[0]);
  const [garlandIsOn, setGarlandIsOn] = useState(false);
  const [snowIsOn, setSnowIsOn] = useLocalStorage('kolem1-snow', false);

  const [soundIsOn, setSoundIsOn] = useLocalStorage('kolem1-christmasSound', false);

  const [savedTrees, setSavedTrees] = useLocalStorage<
    {
      id: number;
      treeState: IToyOnTree[];
      favorites: string[];
      dataImg: string;
      currentTree: ITree;
    }[]
  >('kolem1-savedTrees', []);

  const treeRef = useRef<HTMLDivElement>(null);

  function setSaved(state: IToyOnTree[], favorites: string[], tree: ITree) {
    if (setFavoriteToys) {
      setTreeState(state);
      setFavoriteToys(favorites);
      setCurrentTree(tree);
    }
  }

  async function saveTree() {
    const tree = treeRef.current;
    if (tree && userFavorites) {
      const canvas = await html2canvas(tree, {
        useCORS: true,
        backgroundColor: null,
      });
      const dataImg = canvas.toDataURL('image/jpg');
      setSavedTrees(
        savedTrees.concat({
          id: new Date().getTime(),
          treeState,
          favorites: userFavorites.map((toy) => toy.num),
          dataImg,
          currentTree,
        })
      );
    }
  }

  useEffect(() => {
    if (userFavorites && userFavorites.length > 0) {
      setChoosenToys(copyObj(userFavorites));
    } else if (toysData) {
      setChoosenToys(toysData.slice(0, 19));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFavorites, toysData]);

  function resetSettings() {
    setCurrentTree(trees[0]);
    setCurrentBG(backgrounds[0]);
    setSoundIsOn(false);
    setSnowIsOn(false);
    setGarlandColor(colorChecks[0]);
    setGarlandIsOn(false);
    setTreeState([]);
  }

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
      const treeRect = tree.getBoundingClientRect();
      const treeX = treeRect.left + window.scrollX;
      const treeY = treeRect.top + window.scrollY;
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
      <AudioPlayer isOn={soundIsOn} loop src={`${process.env.PUBLIC_URL}/assets/audio/audio.mp3`} />
      <div className="container">
        <div className="tree-page__inner">
          <div className="tree-page__column">
            <div className="tree-page__settings-item">
              <h2 className="tree-page__settings-title">Музыка</h2>
              <Checkbox label="Включить музыку" checked={soundIsOn} onChange={(e) => setSoundIsOn(e.target.checked)} />
            </div>
            <div className="tree-page__settings-item">
              <h2 className="tree-page__settings-title">Снег</h2>
              <Checkbox label="Включить снег" checked={snowIsOn} onChange={(e) => setSnowIsOn(e.target.checked)} />
            </div>
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
            <div className="tree-page__settings-item">
              <h2 className="tree-page__settings-title">Гирлянда</h2>
              <Checkbox
                label="Включить гирлянду"
                checked={garlandIsOn}
                onChange={(e) => setGarlandIsOn(e.target.checked)}
              />
            </div>
            <div className="tree-page__garlands">
              {colorChecks.map((check) => {
                return (
                  <ColorCheckbox
                    disabled={!garlandIsOn}
                    key={check.id}
                    value={Array.isArray(check.color) ? check.color[0] : check.color}
                    color={`rgb(${check.color})`}
                    className="tree-check"
                    checked={garlandColor === check}
                    handleChange={() => {
                      setGarlandColor(check);
                    }}
                  />
                );
              })}
            </div>
            <button className="button" type="button" onClick={resetSettings}>
              Очистить настройки
            </button>
          </div>
          <div className="tree-page__column tree-page__column--tree">
            <div className="tree" style={{ background: `url(${currentBG.img}) center / cover` }}>
              {snowIsOn ? (
                <div className="tree__snow">
                  <Snow />
                </div>
              ) : (
                ''
              )}
              <div className="tree__img-wrapper">
                <div ref={treeRef}>
                  <img className="tree__img" src={currentTree.img} useMap="#image-map" alt="" />
                  <Map
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'copy';
                    }}
                    onDrop={handleTreeDrop}
                    coords={currentTree.coords}
                  />
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
            {Boolean(savedTrees.length) && <h2 className="tree-page__title">Вы нарядили</h2>}
            <div className="tree-page__grid">
              {savedTrees.map((item) => (
                <div key={item.id} className="saved-tree">
                  <button
                    type="button"
                    className="tree-card"
                    onClick={() => {
                      setSaved(item.treeState, item.favorites, item.currentTree);
                    }}
                  >
                    <div className="tree-card__img-wrapper">
                      <img key={item.id} src={item.dataImg} alt="" />
                    </div>
                  </button>
                  <button
                    className="saved-tree__delete"
                    type="button"
                    onClick={() => {
                      setSavedTrees(savedTrees.filter((tree) => tree.id !== item.id));
                    }}
                  >
                    <span className="visually-hidden">Удалить дерево</span>
                  </button>
                </div>
              ))}
            </div>
            <div className="tree-page__buttons">
              <button className="button" type="button" onClick={saveTree}>
                Сохранить елку
              </button>
              {savedTrees.length > 0 && (
                <button className="button" type="button" onClick={() => setSavedTrees([])}>
                  Очистить хранилище
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
