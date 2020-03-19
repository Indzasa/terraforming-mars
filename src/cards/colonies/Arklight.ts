import { CorporationCard } from "../corporation/CorporationCard";
import { Player } from "../../Player";
import { Tags } from "../Tags";
import { ResourceType } from '../../ResourceType';
import { IProjectCard } from '../IProjectCard';
import { Resources } from '../../Resources';
import { Game } from '../../Game';
import { CardName } from '../../CardName';

export class Arklight implements CorporationCard {
    public name: CardName =  CardName.ARKLIGHT;
    public tags: Array<Tags> = [Tags.ANIMAL];
    public startingMegaCredits: number = 45;
    public resourceType: ResourceType = ResourceType.ANIMAL;

    public play(player: Player) {
        player.setProduction(Resources.MEGACREDITS, 2);
        player.addResourceTo(this);
        return undefined;
    }

    public onCardPlayed(player: Player, _game: Game, card: IProjectCard): void {
        player.addResourceTo(this, card.tags.filter((cardTag) => cardTag === Tags.ANIMAL || cardTag === Tags.PLANT ).length);
      }

    public getVictoryPoints(player: Player): number {
        return Math.floor(player.getResourcesOnCard(this) / 2);
    }
}
