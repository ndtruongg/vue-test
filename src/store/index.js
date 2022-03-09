import Vue from "vue";
import Vuex from "vuex";
import callApi from "../plugins/axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    auth: false,
    user: {},
    term: 0,
    units: [
      {
        textbook_unit_id: 2,
        textbook_id: 73,
        chapter: "chapter 1",
        section: "section 1",
        from_page: 1,
        to_page: 10,
        corr_from_page: 1,
        corr_to_page: 10,
        video_id: 21,
        remarks: "video 21",
        display_order: 1,
        created_at: "2021-12-02 10:36:46",
        updated_at: "2021-12-02 10:36:46",
        video_title: "動画表示タイトル動画表示タイ",
        video_thumbnail_url:
          "https://onestudy-dev.s3-ap-southeast-1.amazonaws.com/videos/21/IMG_9358.JPG",
        num_of_watching: 43,
        num_of_tried_exercises: 30,
        num_of_questions: "173",
        num_of_correct_answers: "36",
        watched_at: "2022-02-22 22:19:36",
        checked: false,
      },
      {
        textbook_unit_id: 3,
        textbook_id: 73,
        chapter: "chapter 1",
        section: "section 1",
        from_page: 10,
        to_page: 20,
        corr_from_page: 10,
        corr_to_page: 20,
        video_id: 37,
        remarks: "video 48",
        display_order: 2,
        created_at: "2021-12-02 10:37:40",
        updated_at: "2022-02-14 10:38:23",
        video_title: "test1",
        video_thumbnail_url: null,
        num_of_watching: 0,
        num_of_tried_exercises: 0,
        num_of_questions: null,
        num_of_correct_answers: null,
        watched_at: null,
        checked: false,
      },
      {
        textbook_unit_id: 4,
        textbook_id: 73,
        chapter: "章のタイトルが入ります章のタイト",
        section: "生徒アプリ",
        from_page: 1,
        to_page: 5,
        corr_from_page: 1,
        corr_to_page: 5,
        video_id: 57,
        remarks: "vd57",
        display_order: 3,
        created_at: "2021-12-02 10:39:15",
        updated_at: "2021-12-02 10:39:15",
        video_title: "test exp",
        video_thumbnail_url:
          "https://onestudy-dev.s3-ap-southeast-1.amazonaws.com/videos/57/IMG_1467.HEIC.jpeg",
        num_of_watching: 15,
        num_of_tried_exercises: 2,
        num_of_questions: "10",
        num_of_correct_answers: "4",
        watched_at: "2022-01-11 11:41:11",
        checked: false,
      },
      {
        textbook_unit_id: 9,
        textbook_id: 73,
        chapter: "chapter 1",
        section: "section 1.1",
        from_page: 1,
        to_page: 10,
        corr_from_page: 1,
        corr_to_page: 10,
        video_id: 23,
        remarks: "fit",
        display_order: 4,
        created_at: "2021-12-02 16:53:52",
        updated_at: "2022-02-14 10:38:54",
        video_title: "正負の数",
        video_thumbnail_url: null,
        num_of_watching: 0,
        num_of_tried_exercises: 1,
        num_of_questions: "3",
        num_of_correct_answers: "0",
        watched_at: null,
        checked: false,
      },
      {
        textbook_unit_id: 14,
        textbook_id: 73,
        chapter: "章のタイトルが入ります章のタイト",
        section: "生徒アプリ",
        from_page: 10,
        to_page: 30,
        corr_from_page: 10,
        corr_to_page: 30,
        video_id: 6136,
        remarks: "test01",
        display_order: 5,
        created_at: "2021-12-06 12:22:14",
        updated_at: "2022-02-14 10:59:19",
        video_title: "Sherlock Holmes (2009) Official Trailer",
        video_thumbnail_url:
          "https://onestudy-dev.s3-ap-southeast-1.amazonaws.com/videos/6136/bbih.jpg",
        num_of_watching: 0,
        num_of_tried_exercises: 0,
        num_of_questions: null,
        num_of_correct_answers: null,
        watched_at: null,
        checked: false,
      },
      {
        textbook_unit_id: 101,
        textbook_id: 73,
        chapter: "単元 新規登録単元 新規登録単元 新規登",
        section: "Unit 1 単元",
        from_page: 1,
        to_page: 100,
        corr_from_page: 1,
        corr_to_page: 20,
        video_id: 6095,
        remarks: "単元 新規登録単元 新規登録単元 新規登 Unit 1 単元",
        display_order: 6,
        created_at: "2021-12-14 11:33:15",
        updated_at: "2021-12-14 11:33:15",
        video_title: "xem video ko_L1",
        video_thumbnail_url:
          "https://onestudy-dev.s3-ap-southeast-1.amazonaws.com/videos/6095/IMG_1475.HEIC.jpeg",
        num_of_watching: 2,
        num_of_tried_exercises: 0,
        num_of_questions: null,
        num_of_correct_answers: null,
        watched_at: "2022-01-10 12:09:59",
        checked: false,
      },
    ],
  },

  getters: {
    auth: (state) => state.auth,
    user: (state) => state.user,
    term: (state) => state.term,
    units: (state) => state.units,
  },

  mutations: {
    SET_AUTH(state, payload) {
      state.auth = payload;
    },
    SET_USER(state, payload) {
      state.user = payload;
    },

    SET_UNIT(state, payload) {
      state.user = payload;
    },

    UPDATE_UNIT(state, payload) {
      var index = state.units.findIndex(function(item) {
        return item.textbook_unit_id === payload.textbook_unit_id;
      });

      payload.checked = !payload.checked;

      state.units = [
        ...state.units.slice(0, index),
        payload,
        ...state.units.slice(index + 1),
      ];
    },
  },

  actions: {
    setAuth({ commit }, data) {
      commit("SET_AUTH", data);
    },
    getUserInfo({ commit }) {
      callApi.get("/get-user-info").then((response) => {
        commit("SET_USER", response.data);
      });
    },
  },
});

export default store;
