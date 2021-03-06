import './form-elements.scss';
import MaskForInput from '@comp/input/input';
import dropdown from '@comp/dropdown/dropdown';

function contentLoaded() {
  MaskForInput();
  dropdown();
}

window.addEventListener('DOMContentLoaded', contentLoaded);
