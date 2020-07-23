import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from 'swagger-ui-dist';
import { serverUrl } from 'src/app/constant/constant';
@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
  styleUrls: ['./swagger.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SwaggerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const ui = SwaggerUIBundle({
      url: `${serverUrl}v2/api-docs`,
      dom_id: '#swagger-ui',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      plugins: [
        SwaggerUIBundle.plugins.DownloadUrl
      ],
      layout: "StandaloneLayout"
    })
  }

}
