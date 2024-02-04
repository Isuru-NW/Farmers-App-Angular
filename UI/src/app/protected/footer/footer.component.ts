import { Component, OnInit } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    // Register additional MatIcons
    matIconRegistry.addSvgIcon('facebook', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/Facebook.svg'));
    matIconRegistry.addSvgIcon('linkedin', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/linkedin.svg'));
    matIconRegistry.addSvgIcon('instagram', domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/instagram.svg'));
  }

  ngOnInit(): void {
  }
}
