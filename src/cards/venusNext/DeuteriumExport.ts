import { IProjectCard } from "../IProjectCard";
import {IActionCard} from '../ICard';
import { Tags } from "../Tags";
import { CardType } from "../CardType";
import { Player } from "../../Player";
import { ResourceType } from "../../ResourceType";
import { OrOptions } from "../../inputs/OrOptions";
import { SelectOption } from "../../inputs/SelectOption";
import { Resources } from '../../Resources';
import { CardName } from '../../CardName';

export class DeuteriumExport implements IActionCard,IProjectCard {
    public cost: number = 11;
    public tags: Array<Tags> = [Tags.SPACE, Tags.VENUS, Tags.ENERGY];
    public name: CardName = CardName.DEUTERIUM_EXPORT;
    public cardType: CardType = CardType.ACTIVE;
    public resourceType: ResourceType = ResourceType.FLOATER;

    public play() {
        return undefined;
    }
    public canAct(): boolean {
        return true;
    }    
    public action(player: Player) {
        if (player.getResourcesOnCard(this) < 1) {
            player.addResourceTo(this);
            return undefined;
        }
        return new OrOptions(
            new SelectOption("Add 1 floater to this card", () => {
                player.addResourceTo(this);
                return undefined;
            }),
            new SelectOption("Remove 1 floater to raise energy production 1 step", () => {
                player.removeResourceFrom(this, 1);
                player.setProduction(Resources.ENERGY);
                return undefined;
            })
        );
    }
}