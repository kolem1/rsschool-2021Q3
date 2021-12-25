import React, { useState } from 'react';
import './ChristmasTree.css';
import { trees, backgrounds } from './treesParam';

export const ChrictmasTree: React.FC = function () {
  const [currentTree, setCurrentTree] = useState(trees[0]);
  const [currentBG, setCurrentBG] = useState(backgrounds[0]);

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
        </div>
      </div>
    </div>
  );
};
