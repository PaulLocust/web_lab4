Используемый стек:
-
- Go - основной язык
- Gin - (backend) веб-фреймворк на Go 
- GORM(ORM) - PostgreSQL
- JSON Web Tokens (JWT) для защиты данных


- React - (frontend)
- node -v (v22.12.0) версия node.js
- npm create vite@6.0.1 (это latest версия vite для создания шаблона React проекта)
- React + TypeScript

План:
-
1. Сначала сосредоточиться на разработке, используя встроенные инструменты Gin и Vite.
2. Перейти к более производительному и надёжному решению в production, используя Nginx для маршрутизации и обслуживания.


Заметки:
-
- .tsx - TypeScript файл, который является React компонентом
- .ts - обычный React файл формата TypeScript 
- Помнить про PascalCasing - каждое новое слово с большой буквы всегда нужно для создания функциональных компонентов в React
- export default - экспорт одного объекта без импорта самого файла удобно/красиво.
- Listbox {'-5','-4','-3','-2','-1','0','1','2','3'} для координаты по оси X
- Text (-3 ... 3) для координаты по оси Y
- Listbox {'-5','-4','-3','-2','-1','0','1','2','3'} для задания радиуса области

import React from "react";
import graphSvg from "../assets/graph.svg"; // Импортируем SVG файл

const Graph: React.FC = () => {
return (
<div className="main__block">
<img src={graphSvg} alt="Graph" className="graph" />
</div>
);
};

export default Graph;