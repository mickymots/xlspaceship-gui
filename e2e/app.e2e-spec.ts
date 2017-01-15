import { XLSpaceshipGUIPage } from './app.po';

describe('xlspaceship-gui App', function() {
  let page: XLSpaceshipGUIPage;

  beforeEach(() => {
    page = new XLSpaceshipGUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
