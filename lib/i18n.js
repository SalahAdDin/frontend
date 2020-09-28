export const i18nPropsFromCtx = (ctx) => {
  if (!(ctx && ctx.req && ctx.req.language)) return {}
  const req = ctx.req
  return {
    lang: req.language,
    dir: req.i18n && req.i18n.dir(req.language),
  }
}
