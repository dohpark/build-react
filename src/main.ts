import { render, setPreviousVDom } from '@react/render';
import App from './App';

const virtualDom = App();

setPreviousVDom(virtualDom);
render(virtualDom);
