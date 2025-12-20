const loginState = {
  data: null,
  loading: false,
  error: null,
};
const newsListState = {
  news: [],
  loadingNews: false,
  errorNews: null,
};

const addState = {
  ads: [],
  loadingAds: false,
  errorAds: null,
};
const uploadImage = {
  image: null,
  uploadLoading: false,
  uploadError: null,
};
const createAdState = {
  adCreate: null,
  adCreateLoading: false,
  adCreateError: null,
};

const deleteAdState = {
  adDelete: null,
  adDeleteLoading: false,
  adDeleteError: null,
};

const getAdminState = {
  admins: [],
  getAdminLoading: false,
  getAdminError: null,
};

const createAdminState = {
  createAdmin: null,
  createAdminLoading: false,
  createAdminError: null,
};

const updateAdminState = {
  updateAdmin: null,
  updateAdminLoading: false,
  updateAdminError: null,
};

const getContentState = {
  content: null,
  contentLoading: false,
  contentError: null,
};

const updateContentState = {
  updateContent: null,
  updateContentLoading: false,
  updateContentError: null,
};
const createNewsState = {
  createNews: null,
  createNewsLoading: false,
  createNewsError: null,
};

const updateNewsState = {
  updateNews: null,
  updateNewsLoading: false,
  updateNewsError: null,
};

const deleteNewsState = {
  deleteNews: null,
  deleteNewsLoading: false,
  deleteNewsError: null,
};

const getVideoState = {
  video: null,
  getVideoLoading: false,
  getVideoError: null,
};

export {
  loginState,
  newsListState,
  addState,
  uploadImage,
  createAdState,
  deleteAdState,
  getAdminState,
  createAdminState,
  updateAdminState,
  getContentState,
  updateContentState,
  createNewsState,
  updateNewsState,
  deleteNewsState,
  getVideoState,
};
