import { App } from "vue";

import ThemeHeader from "./ThemeHeader.vue"
import ThemeButton from "./ThemeButton.vue";
import ThemeInput from "./ThemeInput.vue"
import ThemeSpinner from "./ThemeSpinner.vue"
import ThemeModal from "./ThemeModal.vue"
import ThemeFooterButton from "./ThemeFooterButton.vue"
import ThemeSelectOption from "./ThemeSelectOption.vue"
import ThemeTextArea from "./ThemeTextArea.vue"
import ThemeComment from "./ThemeComment.vue"

export const registerComponents = (app: App): void => {
    app.component('theme-header', ThemeHeader)
    app.component('theme-button', ThemeButton)
    app.component('theme-input', ThemeInput)
    app.component('theme-spinner', ThemeSpinner)
    app.component('theme-modal', ThemeModal)
    app.component('theme-footer-button', ThemeFooterButton)
    app.component('theme-select-option', ThemeSelectOption)
    app.component('theme-text-area', ThemeTextArea)
    app.component('theme-comment', ThemeComment)
}

