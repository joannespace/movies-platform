import React, { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../app/apiService";
import { API_KEY } from "../app/config";
import useFavorite from "../hooks/useFavorite";

const initialState = {
  isLoggedIn: false,
  username: null,
  password: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    //FIRST RUN
    case "INITIALIZE":
      const { isLoggedIn, username, password } = action.payload;
      return { ...state, isLoggedIn, username, password };

    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload.username,
        password: action.payload.password,
        favorite: action.payload.favorite,
      };

    case "LOGOUT":
      return { ...state, isLoggedIn: false, username: null, password: null };

    case "FAVORITE":
      return { ...state, favorite: action.payload.favorite };

    default:
      return state;
  }
};

const FetchDataContext = createContext({ ...initialState });

function FetchContextProvider({ children }) {
  const [open, setOpen] = React.useState(false);
  //Render apiService data
  const defaultValues = {
    trendings: [],
    categories: [],
    movies: [],
  };

  const [fetchData, setFetchData] = useState(defaultValues);

  useEffect(() => {
    const fetchAPI = async () => {
      const trendingObj = await apiService.get(
        `trending/all/day?api_key=${API_KEY}`
      );
      const categoryObj = await apiService.get(
        `genre/movie/list?api_key=${API_KEY}`
      );
      const movieObj = await apiService.get(
        `discover/movie?api_key=${API_KEY}`
      );
      const trendings = trendingObj.data.results;
      const categories = categoryObj.data.genres;
      const movies = movieObj.data.results;

      setFetchData({ ...fetchData, trendings, categories, movies });
    };
    fetchAPI();
  }, [fetchData]);

  // //Favorite state
  const [favorite, setFavorite] = useFavorite("favorite");

  //Check userState for authentication
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      const username = window.localStorage.getItem("username");
      const password = window.localStorage.getItem("password");
      const favorite = window.localStorage.getItem("favorite");

      try {
        if (username && password) {
          dispatch({
            type: "INITIALIZE",
            payload: {
              username,
              password,
              favorite,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isLoggedIn: false,
              username: null,
              password: null,
            },
          });
        }
      } catch (error) {
        console.log(error.message);
        dispatch({
          type: "INITIALIZE",
          payload: { isLoggedIn: false },
        });
      }
    };
    initialize();
  }, []);

  const navigate = useNavigate();

  //Handle LOGIN (action.type)
  const login = async (username, password, callback) => {
    window.localStorage.setItem("username", username);
    window.localStorage.setItem("password", password);

    try {
      if (username && password) {
        dispatch({
          type: "LOGIN",
          payload: { isLoggedIn: true, username, password, favorite },
        });
      } else {
        dispatch({
          type: "LOGOUT",
        });
      }
    } catch (error) {
      console.log("Error from Fetchcontext", error);
      dispatch({
        type: "LOGOUT",
      });
    }
  };

  //Handle LOGOUT (action.type)
  async function logout() {
    dispatch({
      type: "LOGOUT",
    });
    //Just add up
    navigate("/");
  }

  //Handle favorite list adding
  const addFavorite = (movie) => {
    const newFav = favorite.filter((mov) => mov.id !== movie.id);
    setFavorite([...newFav, movie]);
  };

  //Handle favorite list removal
  const removeFavorite = (movie) => {
    const result = favorite.filter((mov) => mov.id !== movie.id);
    setFavorite([...result]);
  };

  return (
    <FetchDataContext.Provider
      value={{
        ...state,
        fetchData,
        login,
        logout,
        favorite,
        addFavorite,
        removeFavorite,
        open,
        setOpen,
      }}
    >
      {children}
    </FetchDataContext.Provider>
  );
}

export { FetchContextProvider, FetchDataContext };
