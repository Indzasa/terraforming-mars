
import Vue, { VNode } from "vue";

import { PlayerInputModel } from "../models/PlayerInputModel";
import { Player } from "./Player";

let unique: number = 0;

export const SelectPlayer = Vue.component("select-player", {
    props: ["playerinput", "onsave"],
    data: function () {
        return {};
    },
    components: {
        "player": Player
    },
    render: function (createElement) {
        const playerInput: PlayerInputModel = this.playerinput as PlayerInputModel;
        unique++;
        const children: Array<VNode> = [];
        children.push(createElement("div", playerInput.title + " - " + playerInput.message));
        let selectedPlayer: string | undefined;
        if (playerInput.players !== undefined) {
            playerInput.players.forEach((player) => {
                children.push(
                    createElement("label", { style: { display: "block", fontSize: "12px" }}, [
                        createElement("input", { domProps: { name: "selectPlayer" + unique, className: "nes-radio", type: "radio", value: player }, on: { change: (event: any) => {
                            if (event.target.checked) {
                                selectedPlayer = event.target.value;
                            }
                        }}}),
                        createElement("player", { attrs: { player: player }})
                    ])
                );
            });
        }
        children.push(
            createElement("button", { domProps: { className: "nes-btn" }, on: { click: () => {
                this.onsave([[selectedPlayer]]);
            } } }, "Save")
        );
        return createElement("div", children);
    }
});
