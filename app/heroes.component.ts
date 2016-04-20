/**
 * Created by Richard on 2016/4/19.
 */
import {Component, OnInit} from 'angular2/core';
import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from './hero.service';
import {Router} from "angular2/router";


@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls: ['app/heroes.component.css'],
  directives: [HeroDetailComponent],
  providers: [HeroService]
})
export class HeroesComponent implements OnInit{
  title = 'N';

  heroes: Hero[];

  selectedHero:Hero;

  constructor(private _heroService: HeroService, private _router: Router) {
  }

  getHeroes() {
    this._heroService.getHeroes().then(
      hero => this.heroes = hero
    )
  }

  // getHeroesSlow() {
  //   this._heroService.getHeroesSlowly().then(
  //     hero => this.heroes = hero
  //   )
  // }

  ngOnInit() {
    this.getHeroes();
    // this.getHeroesSlow();
  }

  onSelect(hero:Hero) {
    this.selectedHero = hero;
  }

  gotoDetail() {
    this._router.navigate(['HeroDetail', {id: this.selectedHero.id}])
  }

}


