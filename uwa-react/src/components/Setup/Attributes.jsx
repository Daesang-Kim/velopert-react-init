import React from 'react';
import PropTypes from 'prop-types';
import parseString from '../../util/parser/xmlParser';

const Attributes = props => {
  const styles = {
    color: 'red',
    backgroundColor: 'black',
    fontWeight: 'bold',
    display: 'inline',
  };

  const { onRequestAttributes, attributesData } = props;
  let json = '';
  parseString(attributesData, (err, result) => {
    json = result;
    return result;
  });

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(attributesData, 'text/xml');
  json = xmlDoc.getElementsByName('System')['0'];
  if (typeof json !== 'undefined') {
    json = json.children['0'];
    // const xmlProperty = parser.parseFromString(json, 'text/xml');
    // const gProperty = xmlProperty.getElementsByTagName('group')[0].innerHTML;
    // json = gProperty;
  }



  // json = (json !== null && (typeof json) !== 'undefined' && (typeof json.capabilities) !== 'undefined' && json.capabilities !== null)
  //   ? `${json.capabilities.attributes['0'].group['0'].category['0'].attribute['6'].$.value}`
  //   : 'Unknown';
  return (
    <div>
      <p>
        <button type="button" onClick={onRequestAttributes}>REQUEST ATTRIBUTES</button>
      </p>
      <p>
        <div style={{ display: 'inline' }}>
          Model Name :
        </div>
        <div style={styles}>
          { JSON.stringify(json) }
        </div>
      </p>
    </div>
  );
};

Attributes.propTypes = {
  attributesData: PropTypes.string,
  onRequestAttributes: PropTypes.func,
};

Attributes.defaultProps = {
  attributesData: 'NoData',
  onRequestAttributes: {},
};


export default Attributes;
