import { MaisonConnecteePage } from './app.po';

describe('maison-connectee App', () => {
  let page: MaisonConnecteePage;

  beforeEach(() => {
    page = new MaisonConnecteePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
