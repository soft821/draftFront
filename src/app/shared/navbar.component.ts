import {Component} from '@angular/core';

@Component({
    selector: 'navi-bar',
    template: `
                <div class="top-bar">
                    <div class="top-bar-title"> Some title</div>
                    <div>
                        <ul class="menu">
                            <li class="nav-menu"><a href="#">Item</a></li>
                        </ul>
                    </div>
                </div>
    `,
    styleUrls: ['./navbar.component.scss']
})

export class NavComponent {}