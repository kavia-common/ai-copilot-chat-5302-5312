/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * PUBLIC_INTERFACE
     * Base URL for backend API. Optional at build/install time; app will default to http://localhost:3001 if not provided.
     */
    REACT_APP_API_BASE_URL?: string;
  }
}
