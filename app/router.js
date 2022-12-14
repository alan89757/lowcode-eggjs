'use strict';

const needLogin = async (ctx, next) => {
  if (ctx.session.username) {
    await next();
  } else {
    // ctx.redirect('/login');
    ctx.redirect(`/login?redirectUrl=${ctx.request.path}`);
  }
};


/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/admin/lowcode', needLogin, controller.admin.lowcode);
  router.get('/admin/schema.json', controller.admin.schema);
  router.get('/api/v1/schemas/1', controller.admin.schema);
  router.get('/admin/preview.html', controller.admin.preview);
  router.get('/admin/preview.html/*', controller.admin.preview);
  router.post('/api/v1/schemas', controller.admin.saveSchema);

  /** login start */

  router.get('/login', controller.admin.loginView);  // 登录
  router.get('/logout', controller.admin.logout);    // 登出
  router.post('/api/login', controller.admin.login); 

  /** login end */
  
  router.get('/api/v1/profile', needLogin, controller.user.profile);

  /** lowcode file start */
  router.get('/api/v1/files', controller.file.listFiles);
  router.get('/api/v1/files/:id', controller.file.getFiles);
  router.post('/api/v1/files', controller.file.createFile);
  router.patch('/api/v1/files/:id', controller.file.updateFile);
  router.delete('/api/v1/files/:id', controller.file.deleteFile);
  /** lowcode file end */

  /** lowcode block start */
  router.get('/api/v1/blocks', controller.block.listBlocks);
  router.post('/api/v1/blocks', controller.block.createBlock);
  /** lowcode block end */
  

};
