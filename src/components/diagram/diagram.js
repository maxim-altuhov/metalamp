import initDiagramRating from './js/initDiagramRating';
import './diagram.scss';

const diagramRatings = document.querySelectorAll('.js-diagram');
diagramRatings.forEach((rating) => initDiagramRating(rating));
