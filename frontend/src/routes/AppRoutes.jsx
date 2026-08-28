import { ROUTES } from "./routes"
import {
  LoginPage,
  OnboardingPage,
  SignupPage,
  SplashPage,
  SuccessPage,
  WelcomePage,
  MessagesLayout,
  ChattingPage,
} from "../pages/LinkUpPages";
import { Routes, Route, Navigate } from "react-router-dom";

const AppRoutes = () => {
  return (
   <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path={ROUTES.ONBOARDING} element={<OnboardingPage />} />
      <Route path={ROUTES.WELCOME} element={<WelcomePage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      <Route path={ROUTES.SUCCESS} element={<SuccessPage />} />
      <Route path={ROUTES.MESSAGES} element={<MessagesLayout />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
