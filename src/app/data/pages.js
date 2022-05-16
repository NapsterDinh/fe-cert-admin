
import OverviewImg from "../base/assets/img/pages/overview.jpg";
import TransactionsImg from "../base/assets/img/pages/transactions.jpg";
import SettingsImg from "../base/assets/img/pages/settings.jpg";
import SignInImg from "../base/assets/img/pages/sign-in.jpg";
import SignUpImg from "../base/assets/img/pages/sign-up.jpg";
import LockImg from "../base/assets/img/pages/lock.jpg";
import ForgotPasswordImg from "../base/assets/img/pages/forgot-password.jpg";
import ResetPasswordImg from "../base/assets/img/pages/reset-password.jpg";
import NotFoundImg from "../base/assets/img/pages/404.jpg";
import ServerErrorImg from "../base/assets/img/pages/500.jpg";

import { Routes } from "app/routes";


export default [
    {
        "id": 1,
        "name": "Overview",
        "image": OverviewImg,
        "link": Routes.DashboardOverview.path
    },
    {
        "id": 2,
        "name": "Transactions",
        "image": TransactionsImg,
        "link": Routes.Transactions.path
    },
    {
        "id": 3,
        "name": "Settings",
        "image": SettingsImg,
        "link": Routes.Settings.path
    },
    {
        "id": 4,
        "name": "Sign In",
        "image": SignInImg,
        "link": Routes.Signin
    },
    {
        "id": 5,
        "name": "Sign Up",
        "image": SignUpImg,
        "link": Routes.Signup.path
    },
    {
        "id": 6,
        "name": "Lock",
        "image": LockImg,
        "link": Routes.Lock.path
    },
    {
        "id": 7,
        "name": "Forgot password",
        "image": ForgotPasswordImg,
        "link": Routes.ForgotPassword.path
    },
    {
        "id": 8,
        "name": "Reset password",
        "image": ResetPasswordImg,
        "link": Routes.ResetPassword.path
    },
    {
        "id": 9,
        "name": "404",
        "image": NotFoundImg,
        "link": Routes.NotFound.path
    },
    {
        "id": 10,
        "name": "500",
        "image": ServerErrorImg,
        "link": Routes.ServerError.path
    }
];