'user strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {PlaceTypeItem, LanguageItem} from '../components';
import {map} from 'underscore';
import {getString} from '../managers/StringsManager.js';

class SettingsView extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const self = this;

    const languages = map(self.props.languages, function(langData, langKey){
      const langProps = {
        "key": langKey,
        "id": langKey,
        "title": langData
      };
      return (<LanguageItem {...langProps}/>);
    });

    const types = map(self.props.placeTypes, function(type){
      const props = Object.assign({
        key: type.id
      }, type);
      return (<PlaceTypeItem {...props}/>);
    });

    return(
      <div>
        <article className="bu-settings bu-article">
          <h2 className="bu-section-header bu-section">{getString(['settings', 'language'])}</h2>
          <ul className="bu-languages">
            {languages}
          </ul>
          <h2 className="bu-section-header bu-section">{getString(['settings', 'types'])}</h2>
          <div className="bu-place-types bu-section">
            {types}
          </div>
        </article>
      </div>
    );
  }
}

export default branch(SettingsView, {
  cursors: {
    languages: ['app', 'settings', 'languages'],
    currentLanguage: ['app', 'settings', 'currentLanguage'],
    placeTypes: ['placeTypes']
  }
});