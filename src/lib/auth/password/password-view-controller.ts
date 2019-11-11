/*
 * Copyright 2019 Grigory Makarov <makkgregory@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {ViewController} from "@telegram/uikit";
import {PasswordView} from "./password-view";
import {SignUpViewController} from "../sign-up/sign-up-view-controller";

export class PasswordViewController extends ViewController<PasswordView> {
    public createView(): PasswordView {
        return new PasswordView();
    }

    public viewDidLoad() {
        super.viewDidLoad();

        this.view.nextButton.tap$.subscribe(() => {
            this.presentingViewController!.present(new SignUpViewController());
            this.dismiss();
        });
    }
}
