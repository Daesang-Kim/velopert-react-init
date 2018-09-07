import { parseString } from 'xml2js';

// function stringToJsonCGIs(result) {
//   let dataType = '';
//   let oValue = null;

//   const dataTypeNode = result.find('dataType')[0].childNodes[0];
//   if (dataTypeNode !== undefined) {
//     dataType = dataTypeNode.nodeName;
//   }
//   if (dataType === 'string') {
//     oValue = {};

//     if (dataTypeNode.getAttribute('minlen') !== null) {
//       oValue.minLength = dataTypeNode.getAttribute('minlen');
//     }

//     if (dataTypeNode.getAttribute('maxlen') !== null) {
//       oValue.maxLength = dataTypeNode.getAttribute('maxlen');
//     }
//   } else if (dataType === 'int' || dataType === 'float') {
//     oValue = {};

//     if (dataTypeNode.getAttribute('min') !== null) {
//       if (dataType === 'float') {
//         oValue.minValue = parseFloat(dataTypeNode.getAttribute('min'));
//       } else {
//         oValue.minValue = parseInt(dataTypeNode.getAttribute('min'), 10);
//       }
//     }

//     if (dataTypeNode.getAttribute('max') !== null) {
//       if (dataType === 'float') {
//         oValue.maxValue = parseFloat(dataTypeNode.getAttribute('max'));
//       } else {
//         oValue.maxValue = parseInt(dataTypeNode.getAttribute('max'), 10);
//       }
//     }
//   } else if (dataType === 'enum' || dataType === 'csv') {
//     oValue = [];

//     const entries = result.find('entry');
//     entries.each(function () {
//       const currEntry = this;
//       oValue.push(currEntry.attr('value'));
//     });
//   } else if (dataType === 'bool') {
//     oValue = {};
//     oValue = true;
//   }

//   return oValue;
// }

// /*
// iXML : Output From http://<ip>/stw-cgi/attributes.cgi/cgis
// inputStr : cginame/submenu/parameter/datatype
// Usage: XMLParser.parseCgiSection(iXML,inputStr);
// */
// let CgiSectionXML;
// const parseCgiSection = (iXML, inputStr) => {
//   if (typeof CgiSectionXML === 'undefined' || CgiSectionXML !== iXML) {
//     CgiSectionXML = iXML;
//     ParsedCgiSection = $($.parseXML(iXML));
//   }

//   var xmlData = ParsedCgiSection;
//   var token = inputStr.split('/');

//   var cgiName = null,
//     submenu = null,
//     action = null,
//     parameter = null,
//     datatype = null;

//   if (token.length === 5) {
//     // cginame/submenu/action/parameter/datatype
//     (cgiName = token[0]),
//       (submenu = token[1]),
//       (action = token[2]),
//       (parameter = token[3]),
//       (datatype = token[4]);
//   } else if (token.length === 4) {
//     // cginame/submenu/parameter/datatype
//     (cgiName = token[0]),
//       (submenu = token[1]),
//       (parameter = token[2]),
//       (datatype = token[3]);
//   } else if (token.length === 3) {
//     // submenu/parameter/datatype
//     (submenu = token[0]), (parameter = token[1]), (datatype = token[2]);
//   } else if (token.length === 2) {
//     // parameter/datatype
//     (parameter = token[0]), (datatype = token[1]);
//   } else {
//     // cannot Found: return 'undefined'
//     return;
//   }

//   if (cgiName) {
//     xmlData = xmlData.find("cgi[name='" + cgiName + "']").first();
//   }
//   if (submenu) {
//     xmlData = xmlData.find("submenu[name='" + submenu + "']").first();
//   }
//   if (action) {
//     xmlData = xmlData.find("action[name='" + action + "']").first();
//   }
//   if (parameter) {
//     xmlData = xmlData.find("parameter[name='" + parameter + "']").first();
//   }

//   if (xmlData.length > 0) {
//     return stringToJsonCGIs(xmlData);
//   } else {
//     // Not Found: return 'undefined'
//     return;
//   }
// };

// function stringToJsonAttributes(result) {
//   var oValue;

//   var dataType = result.attr('type');
//   var iValue = result.attr('value');

//   if (dataType === 'bool') {
//     if (iValue === 'True') {
//       oValue = true;
//     } else {
//       oValue = false;
//     }
//   } else if (dataType === 'int') {
//     oValue = parseInt(iValue, 10);
//   } else if (dataType === 'enum' || dataType === 'csv') {
//     var toSplit = iValue.split(',');

//     oValue = [];
//     for (var i = 0; i < toSplit.length; i = i + 1) {
//       oValue.push(toSplit[i]);
//     }
//   }

//   return oValue;
// }

// xmlParse.parseAttributeSectionByChannel = function(iXML, inputStr, maxChannel) {
//   var xmlData = null;
//   var result = Array(maxChannel);
//   if (
//     typeof AttributeSectionXML === 'undefined' ||
//     AttributeSectionXML !== iXML
//   ) {
//     AttributeSectionXML = iXML;
//     xmlData = $($.parseXML(iXML));
//     ParsedAttributeSection = xmlData;
//   } else {
//     xmlData = ParsedAttributeSection;
//   }
//   var array = inputStr.split('/');
//   var targetIndex = array.length - 1;
//   var groupName = array[0],
//     categoryName = array[1],
//     attrName = array[targetIndex];

//   var setAttributeByChannel = function(channelId, attributes, attrName) {
//     var attribute = attributes.filter("[name='" + attrName + "']").first();
//     result[channelId] = stringToJsonAttributes(attribute);
//   };

//   var category = xmlData
//     .find('group')
//     .filter("[name='" + groupName + "']")
//     .first()
//     .find('category')
//     .filter("[name='" + categoryName + "']")
//     .first();

//   var channels = category.find('channel');
//   if (channels.length === 0) {
//     setAttributeByChannel(0, category.find('attribute'), attrName);
//   } else {
//     channels.each(function() {
//       var channelId = parseInt($(this).attr('number'), 10);
//       setAttributeByChannel(channelId, $(this).find('attribute'), attrName);
//     });
//   }

//   return result;
// };

// /*
// iXML : http://<ip>/stw-cgi/attributes.cgi/attributes
// inputStr : groupName/categoryName/attributeName
// Usage: XMLParser.parseAttributeSection(iXML,inputStr)
// */
// const parseAttributeSection = (iXML, inputStr) => {
//   let xmlData;
//   if (
//     typeof AttributeSectionXML === 'undefined' ||
//     AttributeSectionXML !== iXML
//   ) {
//     AttributeSectionXML = iXML;
//     xmlData = $($.parseXML(iXML));
//     ParsedAttributeSection = xmlData;
//   } else {
//     xmlData = ParsedAttributeSection;
//   }

//   var oValue;

//   var array = inputStr.split('/');
//   if (array.length === 3) {
//     //groupName/categoryName/attributeName
//     var groups = xmlData.find('group');
//     groups.each(function() {
//       var currGroup = $(this);

//       var groupName = currGroup.attr('name');
//       if (groupName === array[0]) {
//         var categories = currGroup.find('category');
//         categories.each(function() {
//           var currCategory = $(this);

//           var catName = currCategory.attr('name');
//           if (catName === array[1]) {
//             var attributes = currCategory.find('attribute');
//             attributes.each(function() {
//               var currAttribute = $(this);

//               var strData = currAttribute.attr('name');
//               if (strData === array[2]) {
//                 oValue = stringToJsonAttributes(currAttribute);
//                 return oValue;
//               }
//             });

//             return false;
//           }
//         });

//         return oValue;
//       }
//     });
//   } else if (array.length === 2) {
//     //categoryName/attributeName
//     var categories = xmlData.find('category');
//     categories.each(function() {
//       var currCategory = $(this);

//       var catName = currCategory.attr('name');
//       if (catName === array[0]) {
//         var attributes = currCategory.find('attribute');
//         attributes.each(function() {
//           var currAttribute = $(this);

//           var strData = currAttribute.attr('name');
//           if (strData === array[1]) {
//             oValue = stringToJsonAttributes(currAttribute);
//             return oValue;
//           }
//         });

//         return false;
//       }
//     });
//   } else if (array.length === 1) {
//     //attributeName
//     var attributes = xmlData.find('attribute');
//     attributes.each(function() {
//       var currAttribute = $(this);

//       var strData = currAttribute.attr('name');
//       if (strData === array[0]) {
//         oValue = stringToJsonAttributes(currAttribute);
//         return oValue;
//       }
//     });
//   }

//   return oValue;
// };

export default parseString;
