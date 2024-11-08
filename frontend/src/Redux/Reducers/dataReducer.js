import {
  DECREMENT_COMPOSER_PAGE,
  DECREMENT_SHEET_PAGE,
  INCREMENT_COMPOSER_PAGE,
  INCREMENT_SHEET_PAGE,
  LOADING_COMPOSERS,
  LOADING_DATA,
  RESET_DATA,
  SET_COMPOSER_PAGE,
  SET_COMPOSERS,
  SET_PAGE_COMPOSERS,
  SET_PAGE_SHEETS,
  SET_SHEET_PAGE,
  SET_SHEETS,
  SET_TOTAL_COMPOSER_PAGES,
  SET_TOTAL_SHEET_PAGES,
  SET_USERS_DATA,
} from "../types";

const initialState = {
  sheets: [],
  composers: [],

  sheetPages: {},
  composerPages: {},

  sheetPage: 1,
  composerPage: 1,

  totalSheetPages: 1,
  totalComposerPages: 1,

  usersData: [],

  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };

    case SET_TOTAL_SHEET_PAGES:
      return {
        ...state,
        totalSheetPages: action.payload,
      };

    case SET_TOTAL_COMPOSER_PAGES:
      return {
        ...state,
        totalComposerPages: action.payload,
      };

    case INCREMENT_SHEET_PAGE:
      return {
        ...state,
        sheetPage: state.sheetPage + 1,
      };

    case INCREMENT_COMPOSER_PAGE:
      return {
        ...state,
        composerPage: state.composerPage + 1,
      };

    case DECREMENT_SHEET_PAGE:
      return {
        ...state,
        sheetPage: state.sheetPage - 1,
      };

    case DECREMENT_COMPOSER_PAGE:
      return {
        ...state,
        composerPage: state.composerPage - 1,
      };

    case SET_SHEET_PAGE:
      return {
        ...state,
        sheetPage: action.payload,
      };

    case SET_COMPOSER_PAGE:
      return {
        ...state,
        composerPage: action.payload,
      };

    case SET_PAGE_SHEETS:
      if (action.composer === undefined) {
        return {
          ...state,
          loading: false,
          sheetPages: { ...state.sheetPages, [action.page]: action.payload },
        };
      }

      for (const key in state.composerPages) {
        if (!state.composerPages.hasOwnProperty(key))
          continue;
        const page = state.composerPages[key];
        const result = page.find(
          composer => composer.safe_name === action.composer,
        );

        if (result !== undefined) {
          const index = page.indexOf(result);

          if (index !== -1) {
            page[index] = { ...page[index], sheets: action.payload };
          }

          return {
            ...state,
            loading: false,
            composerPages: {
              ...state.composerPages,
              [state.composerPages[key]]: page,
            },
          };
        }
      }
      break;

    case SET_PAGE_COMPOSERS:
      return {
        ...state,
        loading: false,
        composerPages: {
          ...state.composerPages,
          [action.page]: action.payload,
        },
      };

    case SET_SHEETS:
      return {
        ...state,
        sheets: action.payload,
        loading: false,
      };

    case LOADING_COMPOSERS:
      return {
        ...state,
        loading: true,
      };

    case SET_COMPOSERS:
      return {
        ...state,
        composers: action.payload,
        loading: false,
      };

    case SET_USERS_DATA:
      return {
        ...state.composerPage,
        usersData: action.payload,
        loading: false,
      };

    case RESET_DATA:
      return {
        ...state,
        composers: [],
        sheets: [],
        sheetPages: {},
        composerPages: {},
      };

    default:
      return state;
  }
}
