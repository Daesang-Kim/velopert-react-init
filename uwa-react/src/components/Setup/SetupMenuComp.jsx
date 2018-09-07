import React from 'react';
import PropTypes from 'prop-types';
import parseString from '../../util/parser/xmlParser';

// uwa 20의 BaseWrapper.js 의 역할을 만들어보자.
const SetupMenuComp = props => {
  const { attributesData } = props;
  let { listMenu } = props;

  parseString(attributesData, (err, result) => {
    if (
      result !== null
      && typeof result !== 'undefined'
      && typeof result.capabilities !== 'undefined'
      && result.capabilities !== null
    ) {
      const json = result.capabilities.attributes['0'].group;

      console.log(json);
      listMenu = [];

      for (let key in json) {
        if (json.hasOwnProperty(key)) {
          const obj = json[key];
          listMenu.push(obj.$.name);
        }
      }
    }

    return result;
  });
  return (
    <div>
      <ul>
        {listMenu.map(v => (
          <li key={v}>
            <h1>{v}</h1>
          </li>
        ))}
      </ul>
    </div>
  );
};

SetupMenuComp.defaultProps = {
  attributesData: 'NoData',
  listMenu: [],
};

SetupMenuComp.propTypes = {
  attributesData: PropTypes.string,
  listMenu: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default SetupMenuComp;
