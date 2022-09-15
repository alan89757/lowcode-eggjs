'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.redirect('/doc');
    const { yuqueViewer } = this.config;
    const {
      menuDataSource,
      darkMode,
      headerHeight,
      blackColor,
      lightColor,
      hideLogo,
      hideTitle,
      logo,
      homepage,
      logoHref,
      logoStyle,
      title,
      titleHref,
    } = yuqueViewer;

    await ctx.render('renderer.nj', {
      data: {
        schemaUrl: 'https://i.ablula.tech/portal/home.json',
        menuDataSource,
        darkMode,
        headerHeight,
        blackColor,
        lightColor,
        hideLogo,
        hideTitle,
        logo,
        homepage,
        logoHref,
        logoStyle,
        title,
        titleHref,
      },
    });
  }

}

module.exports = HomeController;
