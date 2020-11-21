import { DOMParser } from 'xmldom';

function encodeToXMLText(c) {
  for (var a = '', e = c.length, b = 0; b < e; b = b + 1) {
    var d = c.charAt(b);
    switch (d) {
      case '&':
        a += '&amp;';
        break;
      case '/':
        a += '&#47;';
        break;
      case '\'':
        a += '&#039;';
        break;
      case '>':
        a += '&gt;';
        break;
      case '<':
        a += '&lt;';
        break;
      case '"':
        a += '&quot;';
        break;
      case '\r':
        a += '&#xd;';
        break;
      case '\n':
        a += '&#xa;';
        break;
      default:
        a += d;
    }
  }
  return a;
}

function HashMap() {
  this.arrKey = [];
  this.arrValue = [];
  this.exists = function(strKey) {
    strKey = '' + strKey;
    strKey = strKey.toUpperCase();
    for (var i = 0; i < this.arrKey.length; i++)
      if (this.arrKey[i] == strKey)
        return true;
    return false;
  }
  ;
  this.length = function() {
    return this.arrKey.length;
  }
  ;
  this.put = function(strKey, objValue) {
    strKey = '' + strKey;
    strKey = strKey.toUpperCase();
    for (var i = 0; i < this.arrKey.length; i++)
      if (this.arrKey[i] == strKey) {
        this.arrValue[i] = objValue;
        return;
      }
    this.arrKey[this.arrKey.length] = strKey;
    this.arrValue[this.arrValue.length] = objValue;
  }
  ;
  this.get = function(strKey) {
    strKey = '' + strKey;
    strKey = strKey.toUpperCase();
    for (var i = 0; i < this.arrKey.length; i++)
      if (this.arrKey[i] == strKey)
        return this.arrValue[i];
    return null;
  }
  ;
  this.remove = function(strKey) {
    strKey = '' + strKey;
    strKey = strKey.toUpperCase();
    for (var i = 0; i < this.arrKey.length; i++)
      if (this.arrKey[i] == strKey) {
        this.arrKey.splice(i, 1);
        var value = this.arrValue[i];
        this.arrValue.splice(i, 1);
        return value;
      }
    return null;
  }
  ;
  this.getKeys = function() {
    return this.arrKey;
  }
  ;
  this.getValues = function() {
    return this.arrValue;
  };
}

function FieldId() {
  this.nType = 0;
  this.strMainFieldId = '';
  this.strFieldId = '';
  this.strIndexFieldId = '';
}

function parseFieldId(strFieldId) {
  var nLength = strFieldId.length
    , fieldId = null;
  if (strFieldId.charAt(nLength - 1) == ']') {
    var nMatchIndex = findMatchedChar(nLength - 1, strFieldId);
    if (nMatchIndex < 1)
      return null;
    fieldId = new FieldId;
    fieldId.nType = 2;
    fieldId.strMainFieldId = strFieldId.substring(0, nMatchIndex);
    if (fieldId.strMainFieldId.length == 0)
      return null;
    fieldId.strIndexFieldId = strFieldId.substring(nMatchIndex + 1, nLength - 1);
    if (fieldId.strIndexFieldId.length == 0)
      return null;
    return fieldId;
  }
  for (var i = nLength - 1; i >= 0; i--) {
    var ch = strFieldId.charAt(i);
    if (ch == '.') {
      fieldId = new FieldId;
      fieldId.nType = 1;
      fieldId.strMainFieldId = strFieldId.substring(0, i);
      if (fieldId.strMainFieldId.length == 0)
        return null;
      fieldId.strFieldId = strFieldId.substring(i + 1);
      if (fieldId.strFieldId.length == 0)
        return null;
      return fieldId;
    }
  }
  fieldId = new FieldId;
  fieldId.nType = 0;
  fieldId.strFieldId = strFieldId;
  return fieldId;
}

function BooleanField(strName, bValue) {
  this.strType = 'BooleanField';
  this.getType = function() {
    return this.strType;
  }
  ;
  this.strName = strName;
  if (bValue == null)
    bValue = false;
  this.bValue = bValue;
  this.getName = function() {
    return this.strName;
  }
  ;
  this.setName = function(strName) {
    this.strName = strName;
  }
  ;
  this.getValue = function() {
    return this.bValue;
  }
  ;
  this.setValue = function(bValue) {
    this.bValue = bValue;
  }
  ;
  this.toXML = function(nIndentSize) {
    var strXML = '<BF N="' + this.strName + '"';
    strXML += ' V="' + this.bValue + '"/>';
    return strXML;
  }
  ;
  this.toXMLWithIndent = function(nIndentSize) {
    if (nIndentSize == null)
      nIndentSize = 0;
    for (var strIndent = '', i = 0; i < nIndentSize; i = i + 1)
      strIndent += '\t';
    var strXML = strIndent + '<BF N="' + this.strName + '"';
    strXML += ' V="' + this.bValue + '"/>\r\n';
    return strXML;
  }
  ;
  this.toJSONString = function() {
    var str_JSON = '\\"' + this.getName() + '\\":' + this.bValue + ',';
    return str_JSON;
  }
  ;
  this.toJSON = function() {
    var str_JSON = '"' + this.getName() + '":' + this.bValue + ',';
    return str_JSON;
  };
}

function ByteField(strName, byValue) {
  this.strType = 'ByteField';
  this.getType = function() {
    return this.strType;
  }
  ;
  this.strName = strName;
  if (byValue == null)
    byValue = 0;
  this.byValue = byValue;
  this.getName = function() {
    return this.strName;
  }
  ;
  this.setName = function(strName) {
    this.strName = strName;
  }
  ;
  this.getValue = function() {
    return this.byValue;
  }
  ;
  this.setValue = function(byValue) {
    this.byValue = byValue;
  }
  ;
  this.toXML = function(nIndentSize) {
    var strXML = '<BYF N="' + this.strName + '"';
    strXML += ' V="' + this.byValue + '"/>';
    return strXML;
  }
  ;
  this.toXMLWithIndent = function(nIndentSize) {
    if (nIndentSize == null)
      nIndentSize = 0;
    for (var strIndent = '', i = 0; i < nIndentSize; i = i + 1)
      strIndent += '\t';
    var strXML = strIndent + '<BYF N="' + this.strName + '"';
    strXML += ' V="' + this.byValue + '"/>\r\n';
    return strXML;
  }
  ;
  this.toJSONString = function() {
    var str_JSON = '\\"' + this.getName() + '\\":' + this.byValue + ',';
    return str_JSON;
  }
  ;
  this.toJSON = function() {
    var str_JSON = '"' + this.getName() + '":' + this.byValue + ',';
    return str_JSON;
  };
}

function ShortField(strName, shValue) {
  this.strType = 'ShortField';
  this.getType = function() {
    return this.strType;
  }
  ;
  this.strName = strName;
  if (shValue == null)
    shValue = 0;
  this.shValue = shValue;
  this.getName = function() {
    return this.strName;
  }
  ;
  this.setName = function(strName) {
    this.strName = strName;
  }
  ;
  this.getValue = function() {
    return this.shValue;
  }
  ;
  this.setValue = function(shValue) {
    this.shValue = shValue;
  }
  ;
  this.toXML = function(nIndentSize) {
    var strXML = '<SF N="' + this.strName + '"';
    strXML += ' V="' + this.shValue + '"/>';
    return strXML;
  }
  ;
  this.toXMLWithIndent = function(nIndentSize) {
    if (nIndentSize == null)
      nIndentSize = 0;
    for (var strIndent = '', i = 0; i < nIndentSize; i = i + 1)
      strIndent += '\t';
    var strXML = strIndent + '<SF N="' + this.strName + '"';
    strXML += ' V="' + this.shValue + '"/>\r\n';
    return strXML;
  }
  ;
  this.toJSONString = function() {
    var str_JSON = '\\"' + this.getName() + '\\":' + this.shValue + ',';
    return str_JSON;
  }
  ;
  this.toJSON = function() {
    var str_JSON = '"' + this.getName() + '":' + this.shValue + ',';
    return str_JSON;
  };
}

function IntegerField(strName, nValue) {
  this.strType = 'IntegerField';
  this.getType = function() {
    return this.strType;
  }
  ;
  this.strName = strName;
  if (nValue == null)
    nValue = 0;
  this.nValue = nValue;
  this.getName = function() {
    return this.strName;
  }
  ;
  this.setName = function(strName) {
    this.strName = strName;
  }
  ;
  this.getValue = function() {
    return this.nValue;
  }
  ;
  this.setValue = function(nValue) {
    this.nValue = nValue;
  }
  ;
  this.toXML = function(nIndentSize) {
    var strXML = '<NF N="' + this.strName + '"';
    strXML += ' V="' + this.nValue + '"/>';
    return strXML;
  }
  ;
  this.toXMLWithIndent = function(nIndentSize) {
    if (nIndentSize == null)
      nIndentSize = 0;
    for (var strIndent = '', i = 0; i < nIndentSize; i = i + 1)
      strIndent += '\t';
    var strXML = strIndent + '<NF N="' + this.strName + '"';
    strXML += ' V="' + this.nValue + '"/>\r\n';
    return strXML;
  }
  ;
  this.toJSONString = function() {
    var str_JSON = '\\"' + this.getName() + '\\":' + this.nValue + ',';
    return str_JSON;
  }
  ;
  this.toJSON = function() {
    var str_JSON = '"' + this.getName() + '":' + this.nValue + ',';
    return str_JSON;
  };
}

function LongField(strName, lValue) {
  this.strType = 'LongField';
  this.getType = function() {
    return this.strType;
  }
  ;
  this.strName = strName;
  if (lValue == null)
    lValue = 0;
  this.lValue = lValue;
  this.getName = function() {
    return this.strName;
  }
  ;
  this.setName = function(strName) {
    this.strName = strName;
  }
  ;
  this.getValue = function() {
    return this.lValue;
  }
  ;
  this.setValue = function(lValue) {
    this.lValue = lValue;
  }
  ;
  this.toXML = function(nIndentSize) {
    var strXML = '<LF N="' + this.strName + '"';
    strXML += ' V="' + this.lValue + '"/>';
    return strXML;
  }
  ;
  this.toXMLWithIndent = function(nIndentSize) {
    if (nIndentSize == null)
      nIndentSize = 0;
    for (var strIndent = '', i = 0; i < nIndentSize; i = i + 1)
      strIndent += '\t';
    var strXML = strIndent + '<LF N="' + this.strName + '"';
    strXML += ' V="' + this.lValue + '"/>\r\n';
    return strXML;
  }
  ;
  this.toJSONString = function() {
    var str_JSON = '\\"' + this.getName() + '\\":' + this.lValue + ',';
    return str_JSON;
  }
  ;
  this.toJSON = function() {
    var str_JSON = '"' + this.getName() + '":' + this.lValue + ',';
    return str_JSON;
  };
}

function FloatField(strName, fValue) {
  this.strType = 'FloatField';
  this.getType = function() {
    return this.strType;
  }
  ;
  this.strName = strName;
  if (fValue == null)
    fValue = 0;
  this.fValue = fValue;
  this.getName = function() {
    return this.strName;
  }
  ;
  this.setName = function(strName) {
    this.strName = strName;
  }
  ;
  this.getValue = function() {
    return this.fValue;
  }
  ;
  this.setValue = function(fValue) {
    this.fValue = fValue;
  }
  ;
  this.toXML = function(nIndentSize) {
    var strXML = '<FF N="' + this.strName + '"';
    strXML += ' V="' + this.fValue + '"/>';
    return strXML;
  }
  ;
  this.toXMLWithIndent = function(nIndentSize) {
    if (nIndentSize == null)
      nIndentSize = 0;
    for (var strIndent = '', i = 0; i < nIndentSize; i = i + 1)
      strIndent += '\t';
    var strXML = strIndent + '<FF N="' + this.strName + '"';
    strXML += ' V="' + this.fValue + '"/>\r\n';
    return strXML;
  }
  ;
  this.toJSONString = function() {
    var str_JSON = '\\"' + this.getName() + '\\":' + this.fValue + ',';
    return str_JSON;
  }
  ;
  this.toJSON = function() {
    var str_JSON = '"' + this.getName() + '":' + this.fValue + ',';
    return str_JSON;
  };
}

function DoubleField(strName, dblValue) {
  this.strType = 'DoubleField';
  this.getType = function() {
    return this.strType;
  }
  ;
  this.strName = strName;
  if (dblValue == null)
    dblValue = 0;
  this.dblValue = dblValue;
  this.getName = function() {
    return this.strName;
  }
  ;
  this.setName = function(strName) {
    this.strName = strName;
  }
  ;
  this.getValue = function() {
    return this.dblValue;
  }
  ;
  this.setValue = function(dblValue) {
    this.dblValue = dblValue;
  }
  ;
  this.toXML = function(nIndentSize) {
    var strXML = '<DBLF N="' + this.strName + '"';
    strXML += ' V="' + this.dblValue + '"/>';
    return strXML;
  }
  ;
  this.toXMLWithIndent = function(nIndentSize) {
    if (nIndentSize == null)
      nIndentSize = 0;
    for (var strIndent = '', i = 0; i < nIndentSize; i = i + 1)
      strIndent += '\t';
    var strXML = strIndent + '<DBLF N="' + this.strName + '"';
    strXML += ' V="' + this.dblValue + '"/>\r\n';
    return strXML;
  }
  ;
  this.toJSONString = function() {
    var str_JSON = '\\"' + this.getName() + '\\":' + this.dblValue + ',';
    return str_JSON;
  }
  ;
  this.toJSON = function() {
    var str_JSON = '"' + this.getName() + '":' + this.dblValue + ',';
    return str_JSON;
  };
}

function StringField(strName, strValue) {
  this.strType = 'StringField';
  this.getType = function() {
    return this.strType;
  }
  ;
  this.strName = strName;
  if (strValue == null)
    strValue = '';
  this.strValue = strValue;
  this.getName = function() {
    return this.strName;
  }
  ;
  this.setName = function(strName) {
    this.strName = strName;
  }
  ;
  this.getValue = function() {
    return this.strValue;
  }
  ;
  this.setValue = function(strValue) {
    this.strValue = strValue;
  }
  ;
  this.toXML = function(nIndentSize) {
    var strXML = '<STRF N="' + this.strName + '"';
    strXML += ' V="' + encodeToXMLText(this.strValue) + '"/>';
    return strXML;
  }
  ;
  this.toXMLWithIndent = function(nIndentSize) {
    if (nIndentSize == null)
      nIndentSize = 0;
    for (var strIndent = '', i = 0; i < nIndentSize; i = i + 1)
      strIndent += '\t';
    var strXML = strIndent + '<STRF N="' + this.strName + '"';
    strXML += ' V="' + encodeToXMLText(this.strValue) + '"/>\r\n';
    return strXML;
  }
  ;
  this.toJSONString = function() {
    var str_JSON = '\\"' + this.getName() + '\\":\\"' + this.strValue + '\\",';
    return str_JSON;
  }
  ;
  this.toJSON = function() {
    var str_JSON = '"' + this.getName() + '":"' + this.strValue + '",';
    return str_JSON;
  };
}

function DateField(strName, strValue) {
  this.strType = 'DateField';
  this.getType = function() {
    return this.strType;
  }
  ;
  this.getName = function() {
    return this.strName;
  }
  ;
  this.setName = function(strName) {
    this.strName = strName;
  }
  ;
  this.getValue = function() {
    return this.strValue;
  }
  ;
  this.setValue = function(strValue) {
    if (strValue.length > 0 && strValue.length != 10)
      throw 'Invalid date format: ' + strValue;
    if (strValue.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/) == null)
      throw 'Invalid date format: ' + strValue;
    this.strValue = strValue;
  }
  ;
  this.strName = strName;
  if (strValue == null)
    strValue = 0;
  this.setValue(strValue);
  this.toXML = function(nIndentSize) {
    var strXML = '<DF N="' + this.strName + '"';
    strXML += ' V="' + this.strValue + '"/>';
    return strXML;
  }
  ;
  this.toXMLWithIndent = function(nIndentSize) {
    if (nIndentSize == null)
      nIndentSize = 0;
    for (var strIndent = '', i = 0; i < nIndentSize; i = i + 1)
      strIndent += '\t';
    var strXML = strIndent + '<DF N="' + this.strName + '"';
    strXML += ' V="' + this.strValue + '"/>\r\n';
    return strXML;
  }
  ;
  this.toJSONString = function() {
    var str_JSON = '\\"' + this.getName() + '\\":' + this.strValue + ',';
    return str_JSON;
  }
  ;
  this.toJSON = function() {
    var str_JSON = '"' + this.getName() + '":' + this.strValue + ',';
    return str_JSON;
  };
}

function TimeField(strName, strValue) {
  this.strType = 'TimeField';
  this.getType = function() {
    return this.strType;
  }
  ;
  this.getName = function() {
    return this.strName;
  }
  ;
  this.setName = function(strName) {
    this.strName = strName;
  }
  ;
  this.getValue = function() {
    return this.strValue;
  }
  ;
  this.setValue = function(strValue) {
    if (strValue.length > 0 && strValue.length != 8)
      throw 'Invalid time format: ' + strValue;
    if (strValue.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/) == null)
      throw 'Invalid time format: ' + strValue;
    this.strValue = strValue;
  }
  ;
  this.strName = strName;
  if (strValue == null)
    strValue = 0;
  this.setValue(strValue);
  this.toXML = function(nIndentSize) {
    var strXML = '<TF N="' + this.strName + '"';
    strXML += ' V="' + this.strValue + '"/>';
    return strXML;
  }
  ;
  this.toXMLWithIndent = function(nIndentSize) {
    if (nIndentSize == null)
      nIndentSize = 0;
    for (var strIndent = '', i = 0; i < nIndentSize; i = i + 1)
      strIndent += '\t';
    var strXML = strIndent + '<TF N="' + this.strName + '"';
    strXML += ' V="' + this.strValue + '"/>\r\n';
    return strXML;
  }
  ;
  this.toJSONString = function() {
    var str_JSON = '\\"' + this.getName() + '\\":' + this.strValue + ',';
    return str_JSON;
  }
  ;
  this.toJSON = function() {
    var str_JSON = '"' + this.getName() + '":' + this.strValue + ',';
    return str_JSON;
  };
}

function DateTimeField(strName, strValue) {
  this.strType = 'DateTimeField';
  this.getType = function() {
    return this.strType;
  }
  ;
  this.getName = function() {
    return this.strName;
  }
  ;
  this.setName = function(strName) {
    this.strName = strName;
  }
  ;
  this.getValue = function() {
    return this.strValue;
  }
  ;
  this.setValue = function(strValue) {
    if (strValue.length == 0) {
      this.strValue = strValue;
      return;
    }
    if (strValue.length != 19)
      throw 'Invalid datetime format: ' + strValue;
    if (strValue.match(/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/) == null)
      throw 'Invalid datetime format: ' + strValue;
    this.strValue = strValue;
  }
  ;
  this.strName = strName;
  if (strValue == null)
    strValue = 0;
  this.setValue(strValue);
  this.toXML = function(nIndentSize) {
    var strXML = '<DTF N="' + this.strName + '"';
    strXML += ' V="' + this.strValue + '"/>';
    return strXML;
  }
  ;
  this.toXMLWithIndent = function(nIndentSize) {
    if (nIndentSize == null)
      nIndentSize = 0;
    for (var strIndent = '', i = 0; i < nIndentSize; i = i + 1)
      strIndent += '\t';
    var strXML = strIndent + '<DTF N="' + this.strName + '"';
    strXML += ' V="' + this.strValue + '"/>\r\n';
    return strXML;
  }
  ;
  this.toJSONString = function() {
    var str_JSON = '\\"' + this.getName() + '\\":"' + this.strValue + '",';
    return str_JSON;
  }
  ;
  this.toJSON = function() {
    var str_JSON = '"' + this.getName() + '":"' + this.strValue + '",';
    return str_JSON;
  };
}

function ByteArrayField() {
  this.strType = 'ByteArrayField';
  this.getType = function() {
    return this.strType;
  }
  ;
  this.strName = '';
  this.bysValue = [];
  this.getName = function() {
    return this.strName;
  }
  ;
  this.setName = function(strName) {
    this.strName = strName;
  }
  ;
  this.getLength = function() {
    return bysValue.length;
  }
  ;
  this.getValue = function() {
    return this.bysValue;
  }
  ;
  this.setValue = function(byValue) {
    this.bysValue = byValue;
  }
  ;
  this.getValueAt = function(nIndex) {
    return this.bysValue[nIndex];
  }
  ;
  this.setValueAt = function(nIndex, byValue) {
    this.bysValue[nIndex] = byValue;
  }
  ;
  this.toXML = function(nIndentSize) {
    var strXML = '<BYAF N="' + this.strName + '"';
    strXML += ' V="';
    for (var i = 0; i < this.bysValue.length; i = i + 1) {
      if (i > 0)
        strXML += ',';
      strXML += this.bysValue[i];
    }
    strXML += '"/>';
    return strXML;
  }
  ;
  this.toXMLWithIndent = function(nIndentSize) {
    if (nIndentSize == null)
      nIndentSize = 0;
    for (var strIndent = '', i = 0; i < nIndentSize; i = i + 1)
      strIndent += '\t';
    var strXML = strIndent + '<BYAF N="' + this.strName + '"';
    strXML += ' V="';
    for (var i = 0; i < this.bysValue.length; i = i + 1) {
      if (i > 0)
        strXML += ',';
      strXML += this.bysValue[i];
    }
    strXML += '"/>\r\n';
    return strXML;
  }
  ;
  this.toJSONString = function() {
    var str_JSON = '\\"' + this.getName() + '\\":[';
    for (var i = 0; i < this.bysValue.length; i = i + 1) {
      var _sign = i == this.bysValue.length - 1 ? '' : ',';
      str_JSON += '' + this.bysValue[i] + _sign;
    }
    str_JSON += '],';
    return str_JSON;
  }
  ;
  this.toJSON = function() {
    var str_JSON = '"' + this.getName() + '":[';
    for (var i = 0; i < this.bysValue.length; i = i + 1) {
      var _sign = i == this.bysValue.length - 1 ? '' : ',';
      str_JSON += '' + this.bysValue[i] + _sign;
    }
    str_JSON += '],';
    return str_JSON;
  };
}

function ShortArrayField() {
  this.strType = 'ShortArrayField';
  this.getType = function() {
    return this.strType;
  }
  ;
  this.strName = '';
  this.shsValue = [];
  this.getName = function() {
    return this.strName;
  }
  ;
  this.setName = function(strName) {
    this.strName = strName;
  }
  ;
  this.getLength = function() {
    return shsValue.length;
  }
  ;
  this.getValue = function() {
    return this.shsValue;
  }
  ;
  this.setValue = function(shValue) {
    this.shsValue = shValue;
  }
  ;
  this.getValueAt = function(nIndex) {
    return this.shsValue[nIndex];
  }
  ;
  this.setValueAt = function(nIndex, shValue) {
    this.shsValue[nIndex] = shValue;
  }
  ;
  this.toXML = function(nIndentSize) {
    var strXML = '<SAF N="' + this.strName + '"';
    strXML += ' V="';
    for (var i = 0; i < this.shsValue.length; i = i + 1) {
      if (i > 0)
        strXML += ',';
      strXML += this.shsValue[i];
    }
    strXML += '"/>';
    return strXML;
  }
  ;
  this.toXMLWithIndent = function(nIndentSize) {
    if (nIndentSize == null)
      nIndentSize = 0;
    for (var strIndent = '', i = 0; i < nIndentSize; i = i + 1)
      strIndent += '\t';
    var strXML = strIndent + '<SAF N="' + this.strName + '"';
    strXML += ' V="';
    for (var i = 0; i < this.shsValue.length; i = i + 1) {
      if (i > 0)
        strXML += ',';
      strXML += this.shsValue[i];
    }
    strXML += '"/>\r\n';
    return strXML;
  }
  ;
  this.toJSONString = function() {
    var str_JSON = '\\"' + this.getName() + '\\":[';
    for (var i = 0; i < this.shsValue.length; i = i + 1) {
      var _sign = i == this.shsValue.length - 1 ? '' : ',';
      str_JSON += '' + this.shsValue[i] + _sign;
    }
    str_JSON += '],';
    return str_JSON;
  }
  ;
  this.toJSON = function() {
    var str_JSON = '"' + this.getName() + '":[';
    for (var i = 0; i < this.shsValue.length; i = i + 1) {
      var _sign = i == this.shsValue.length - 1 ? '' : ',';
      str_JSON += '' + this.shsValue[i] + _sign;
    }
    str_JSON += '],';
    return str_JSON;
  };
}

function IntegerArrayField() {
  this.strType = 'IntegerArrayField';
  this.getType = function() {
    return this.strType;
  }
  ;
  this.strName = '';
  this.nsValue = [];
  this.getName = function() {
    return this.strName;
  }
  ;
  this.setName = function(strName) {
    this.strName = strName;
  }
  ;
  this.getLength = function() {
    return nsValue.length;
  }
  ;
  this.getValue = function() {
    return this.nsValue;
  }
  ;
  this.setValue = function(nsValue) {
    this.nsValue = nsValue;
  }
  ;
  this.getValueAt = function(nIndex) {
    return this.nsValue[nIndex];
  }
  ;
  this.setValueAt = function(nIndex, nValue) {
    this.nsValue[nIndex] = nValue;
  }
  ;
  this.toXML = function(nIndentSize) {
    var strXML = '<NAF N="' + this.strName + '"';
    strXML += ' V="';
    for (var i = 0; i < this.nsValue.length; i = i + 1) {
      if (i > 0)
        strXML += ',';
      strXML += this.nsValue[i];
    }
    strXML += '"/>';
    return strXML;
  }
  ;
  this.toXMLWithIndent = function(nIndentSize) {
    if (nIndentSize == null)
      nIndentSize = 0;
    for (var strIndent = '', i = 0; i < nIndentSize; i = i + 1)
      strIndent += '\t';
    var strXML = strIndent + '<NAF N="' + this.strName + '"';
    strXML += ' V="';
    for (var i = 0; i < this.nsValue.length; i = i + 1) {
      if (i > 0)
        strXML += ',';
      strXML += this.nsValue[i];
    }
    strXML += '"/>\r\n';
    return strXML;
  }
  ;
  this.toJSONString = function() {
    var str_JSON = '\\"' + this.getName() + '\\":[';
    for (var i = 0; i < this.nsValue.length; i = i + 1) {
      var _sign = i == this.nsValue.length - 1 ? '' : ',';
      str_JSON += '' + this.nsValue[i] + _sign;
    }
    str_JSON += '],';
    return str_JSON;
  }
  ;
  this.toJSON = function() {
    var str_JSON = '"' + this.getName() + '":[';
    for (var i = 0; i < this.nsValue.length; i = i + 1) {
      var _sign = i == this.nsValue.length - 1 ? '' : ',';
      str_JSON += '' + this.nsValue[i] + _sign;
    }
    str_JSON += '],';
    return str_JSON;
  };
}

function LongArrayField() {
  this.strType = 'LongArrayField';
  this.getType = function() {
    return this.strType;
  }
  ;
  this.strName = '';
  this.lsValue = [];
  this.getName = function() {
    return this.strName;
  }
  ;
  this.setName = function(strName) {
    this.strName = strName;
  }
  ;
  this.getLength = function() {
    return lsValue.length;
  }
  ;
  this.getValue = function() {
    return this.lsValue;
  }
  ;
  this.setValue = function(lsValue) {
    this.lsValue = lsValue;
  }
  ;
  this.getValueAt = function(nIndex) {
    return this.lsValue[nIndex];
  }
  ;
  this.setValueAt = function(nIndex, lValue) {
    this.lsValue[nIndex] = lValue;
  }
  ;
  this.toXML = function(nIndentSize) {
    var strXML = '<LAF N="' + this.strName + '"';
    strXML += ' V="';
    for (var i = 0; i < this.lsValue.length; i = i + 1) {
      if (i > 0)
        strXML += ',';
      strXML += this.lsValue[i];
    }
    strXML += '"/>';
    return strXML;
  }
  ;
  this.toXMLWithIndent = function(nIndentSize) {
    if (nIndentSize == null)
      nIndentSize = 0;
    for (var strIndent = '', i = 0; i < nIndentSize; i = i + 1)
      strIndent += '\t';
    var strXML = strIndent + '<LAF N="' + this.strName + '"';
    strXML += ' V="';
    for (var i = 0; i < this.lsValue.length; i = i + 1) {
      if (i > 0)
        strXML += ',';
      strXML += this.lsValue[i];
    }
    strXML += '"/>\r\n';
    return strXML;
  }
  ;
  this.toJSONString = function() {
    var str_JSON = '\\"' + this.getName() + '\\":[';
    for (var i = 0; i < this.lsValue.length; i = i + 1) {
      var _sign = i == this.lsValue.length - 1 ? '' : ',';
      str_JSON += '' + this.lsValue[i] + _sign;
    }
    str_JSON += '],';
    return str_JSON;
  }
  ;
  this.toJSON = function() {
    var str_JSON = '"' + this.getName() + '":[';
    for (var i = 0; i < this.lsValue.length; i = i + 1) {
      var _sign = i == this.lsValue.length - 1 ? '' : ',';
      str_JSON += '' + this.lsValue[i] + _sign;
    }
    str_JSON += '],';
    return str_JSON;
  };
}

function FloatArrayField() {
  this.strType = 'FloatArrayField';
  this.getType = function() {
    return this.strType;
  }
  ;
  this.strName = '';
  this.fsValue = [];
  this.getName = function() {
    return this.strName;
  }
  ;
  this.setName = function(strName) {
    this.strName = strName;
  }
  ;
  this.getLength = function() {
    return fsValue.length;
  }
  ;
  this.getValue = function() {
    return this.fsValue;
  }
  ;
  this.setValue = function(fsValue) {
    this.fsValue = fsValue;
  }
  ;
  this.getValueAt = function(nIndex) {
    return this.fsValue[nIndex];
  }
  ;
  this.setValueAt = function(nIndex, fValue) {
    this.fsValue[nIndex] = fValue;
  }
  ;
  this.toXML = function(nIndentSize) {
    var strXML = '<FAF N="' + this.strName + '"';
    strXML += ' V="';
    for (var i = 0; i < this.fsValue.length; i = i + 1) {
      if (i > 0)
        strXML += ',';
      strXML += this.fsValue[i];
    }
    strXML += '"/>';
    return strXML;
  }
  ;
  this.toXMLWithIndent = function(nIndentSize) {
    if (nIndentSize == null)
      nIndentSize = 0;
    for (var strIndent = '', i = 0; i < nIndentSize; i = i + 1)
      strIndent += '\t';
    var strXML = strIndent + '<FAF N="' + this.strName + '"';
    strXML += ' V="';
    for (var i = 0; i < this.fsValue.length; i = i + 1) {
      if (i > 0)
        strXML += ',';
      strXML += this.fsValue[i];
    }
    strXML += '"/>\r\n';
    return strXML;
  }
  ;
  this.toJSONString = function() {
    var str_JSON = '\\"' + this.getName() + '\\":[';
    for (var i = 0; i < this.fsValue.length; i = i + 1) {
      var _sign = i == this.fsValue.length - 1 ? '' : ',';
      str_JSON += '' + this.fsValue[i] + _sign;
    }
    str_JSON += '],';
    return str_JSON;
  }
  ;
  this.toJSON = function() {
    var str_JSON = '"' + this.getName() + '":[';
    for (var i = 0; i < this.fsValue.length; i = i + 1) {
      var _sign = i == this.fsValue.length - 1 ? '' : ',';
      str_JSON += '' + this.fsValue[i] + _sign;
    }
    str_JSON += '],';
    return str_JSON;
  };
}

function DoubleArrayField() {
  this.strType = 'DoubleArrayField';
  this.getType = function() {
    return this.strType;
  }
  ;
  this.strName = '';
  this.dblsValue = [];
  this.getName = function() {
    return this.strName;
  }
  ;
  this.setName = function(strName) {
    this.strName = strName;
  }
  ;
  this.getLength = function() {
    return dblsValue.length;
  }
  ;
  this.getValue = function() {
    return this.dblsValue;
  }
  ;
  this.setValue = function(dblsValue) {
    this.dblsValue = dblsValue;
  }
  ;
  this.getValueAt = function(nIndex) {
    return this.dblsValue[nIndex];
  }
  ;
  this.setValueAt = function(nIndex, lValue) {
    this.dblsValue[nIndex] = dblValue;
  }
  ;
  this.toXML = function(nIndentSize) {
    var strXML = '<DBLAF N="' + this.strName + '"';
    strXML += ' V="';
    for (var i = 0; i < this.dblsValue.length; i = i + 1) {
      if (i > 0)
        strXML += ',';
      strXML += this.dblsValue[i];
    }
    strXML += '"/>';
    return strXML;
  }
  ;
  this.toXMLWithIndent = function(nIndentSize) {
    if (nIndentSize == null)
      nIndentSize = 0;
    for (var strIndent = '', i = 0; i < nIndentSize; i = i + 1)
      strIndent += '\t';
    var strXML = strIndent + '<DBLAF N="' + this.strName + '"';
    strXML += ' V="';
    for (var i = 0; i < this.dblsValue.length; i = i + 1) {
      if (i > 0)
        strXML += ',';
      strXML += this.dblsValue[i];
    }
    strXML += '"/>\r\n';
    return strXML;
  }
  ;
  this.toJSONString = function() {
    var str_JSON = '\\"' + this.getName() + '\\":[';
    for (var i = 0; i < this.dblsValue.length; i = i + 1) {
      var _sign = i == this.dblsValue.length - 1 ? '' : ',';
      str_JSON += '' + this.dblsValue[i] + _sign;
    }
    str_JSON += '],';
    return str_JSON;
  }
  ;
  this.toJSON = function() {
    var str_JSON = '"' + this.getName() + '":[';
    for (var i = 0; i < this.dblsValue.length; i = i + 1) {
      var _sign = i == this.dblsValue.length - 1 ? '' : ',';
      str_JSON += '' + this.dblsValue[i] + _sign;
    }
    str_JSON += '],';
    return str_JSON;
  };
}

function StringArrayField() {
  this.strType = 'StringArrayField';
  this.getType = function() {
    return this.strType;
  }
  ;
  this.strName = '';
  this.strsValue = [];
  this.getName = function() {
    return this.strName;
  }
  ;
  this.setName = function(strName) {
    this.strName = strName;
  }
  ;
  this.getLength = function() {
    return strsValue.length;
  }
  ;
  this.getValue = function() {
    return this.strsValue;
  }
  ;
  this.setValue = function(strsValue) {
    this.strsValue = strsValue;
  }
  ;
  this.getValueAt = function(nIndex) {
    return this.strsValue[nIndex];
  }
  ;
  this.setValueAt = function(nIndex, strValue) {
    this.strsValue[nIndex] = strValue;
  }
  ;
  this.toXML = function(nIndentSize) {
    var strXML = '<STRAF N="' + this.strName + '">';
    for (var i = 0; i < this.strsValue.length; i = i + 1)
      strXML += '<STR>' + encodeToXMLText(this.strsValue[i]) + '</STR>';
    strXML += '</STRAF>';
    return strXML;
  }
  ;
  this.toXMLWithIndent = function(nIndentSize) {
    if (nIndentSize == null)
      nIndentSize = 0;
    for (var strIndent = '', i = 0; i < nIndentSize; i = i + 1)
      strIndent += '\t';
    var strXML = strIndent + '<STRAF N="' + this.strName + '">\r\n';
    for (var i = 0; i < this.strsValue.length; i = i + 1)
      strXML += strIndent + '\t<STR>' + encodeToXMLText(this.strsValue[i]) + '</STR>\r\n';
    strXML += strIndent + '</STRAF>\r\n';
    return strXML;
  }
  ;
  this.toJSONString = function() {
    var str_JSON = '\\"' + this.getName() + '\\":[';
    for (var i = 0; i < this.strsValue.length; i = i + 1) {
      var _sign = i == this.strsValue.length - 1 ? '"' : '",';
      str_JSON += '"' + this.strsValue[i] + _sign;
    }
    str_JSON += '],';
    console.log(str_JSON);
    return str_JSON;
  }
  ;
  this.toJSON = function() {
    var str_JSON = '"' + this.getName() + '":[';
    for (var i = 0; i < this.strsValue.length; i = i + 1) {
      var _sign = i == this.strsValue.length - 1 ? '"' : '",';
      str_JSON += '"' + this.strsValue[i] + _sign;
    }
    str_JSON += '],';
    return str_JSON;
  };
}

function DateArrayField() {
  this.strType = 'DateArrayField';
  this.getType = function() {
    return this.strType;
  }
  ;
  this.strName = '';
  this.strsValue = [];
  this.getName = function() {
    return this.strName;
  }
  ;
  this.setName = function(strName) {
    this.strName = strName;
  }
  ;
  this.getLength = function() {
    return strsValue.length;
  }
  ;
  this.getValue = function() {
    return this.strsValue;
  }
  ;
  this.setValue = function(strsValue) {
    for (var i = 0; i < strsValue.length; i = i + 1) {
      if (strsValue[i].length == 0)
        continue;
      if (strsValue[i].length != 10)
        throw 'Invalid date format: ' + strsValue[i];
      if (strsValue[i].match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/) == null)
        throw 'Invalid date format: ' + strsValue[i];
    }
    this.strsValue = strsValue;
  }
  ;
  this.getValueAt = function(nIndex) {
    return this.strsValue[nIndex];
  }
  ;
  this.setValueAt = function(nIndex, strValue) {
    if (strValue.length > 0 && strValue.length != 10)
      throw 'Invalid date format: ' + strValue;
    else if (strValue.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/) == null)
      throw 'Invalid date format: ' + strValue;
    this.strsValue[nIndex] = strValue;
  }
  ;
  this.toXML = function(nIndentSize) {
    var strXML = '<DAF N="' + this.strName + '"';
    strXML += ' V="';
    for (var i = 0; i < this.strsValue.length; i = i + 1) {
      if (i > 0)
        strXML += ',';
      strXML += this.strsValue[i];
    }
    strXML += '"/>';
    return strXML;
  }
  ;
  this.toXMLWithIndent = function(nIndentSize) {
    if (nIndentSize == null)
      nIndentSize = 0;
    for (var strIndent = '', i = 0; i < nIndentSize; i = i + 1)
      strIndent += '\t';
    var strXML = strIndent + '<DAF N="' + this.strName + '"';
    strXML += ' V="';
    for (var i = 0; i < this.strsValue.length; i = i + 1) {
      if (i > 0)
        strXML += ',';
      strXML += this.strsValue[i];
    }
    strXML += '"/>\r\n';
    return strXML;
  }
  ;
  this.toJSONString = function() {
    var str_JSON = '\\"' + this.getName() + '\\":[';
    for (var i = 0; i < this.strsValue.length; i = i + 1) {
      var _sign = i == this.strsValue.length - 1 ? '' : ',';
      str_JSON += '' + this.strsValue[i] + _sign;
    }
    str_JSON += '],';
    return str_JSON;
  }
  ;
  this.toJSON = function() {
    var str_JSON = '"' + this.getName() + '":[';
    for (var i = 0; i < this.strsValue.length; i = i + 1) {
      var _sign = i == this.strsValue.length - 1 ? '' : ',';
      str_JSON += '' + this.strsValue[i] + _sign;
    }
    str_JSON += '],';
    return str_JSON;
  };
}

function TimeArrayField() {
  this.strType = 'TimeArrayField';
  this.getType = function() {
    return this.strType;
  }
  ;
  this.strName = '';
  this.strsValue = [];
  this.getName = function() {
    return this.strName;
  }
  ;
  this.setName = function(strName) {
    this.strName = strName;
  }
  ;
  this.getLength = function() {
    return strsValue.length;
  }
  ;
  this.getValue = function() {
    return this.strsValue;
  }
  ;
  this.setValue = function(strsValue) {
    for (var i = 0; i < strsValue.length; i = i + 1) {
      if (strsValue[i].length == 0)
        continue;
      if (strsValue[i].length != 8)
        throw 'Invalid time format: ' + strsValue[i];
      if (strsValue[i].match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/) == null)
        throw 'Invalid time format: ' + strsValue[i];
    }
    this.strsValue = strsValue;
  }
  ;
  this.getValueAt = function(nIndex) {
    return this.strsValue[nIndex];
  }
  ;
  this.setValueAt = function(nIndex, strValue) {
    if (strValue.length > 0 && strValue.length != 8)
      throw 'Invalid time format: ' + strValue;
    else if (strValue.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/) == null)
      throw 'Invalid time format: ' + strValue;
    this.strsValue[nIndex] = strValue;
  }
  ;
  this.toXML = function(nIndentSize) {
    var strXML = '<TAF N="' + this.strName + '"';
    strXML += ' V="';
    for (var i = 0; i < this.strsValue.length; i = i + 1) {
      if (i > 0)
        strXML += ',';
      strXML += this.strsValue[i];
    }
    strXML += '"/>';
    return strXML;
  }
  ;
  this.toXMLWithIndent = function(nIndentSize) {
    if (nIndentSize == null)
      nIndentSize = 0;
    for (var strIndent = '', i = 0; i < nIndentSize; i = i + 1)
      strIndent += '\t';
    var strXML = strIndent + '<TAF N="' + this.strName + '"';
    strXML += ' V="';
    for (var i = 0; i < this.strsValue.length; i = i + 1) {
      if (i > 0)
        strXML += ',';
      strXML += this.strsValue[i];
    }
    strXML += '"/>\r\n';
    return strXML;
  }
  ;
  this.toJSONString = function() {
    var str_JSON = '\\"' + this.getName() + '\\":[';
    for (var i = 0; i < this.strsValue.length; i = i + 1) {
      var _sign = i == this.strsValue.length - 1 ? '' : ',';
      str_JSON += '' + this.strsValue[i] + _sign;
    }
    str_JSON += '],';
    return str_JSON;
  }
  ;
  this.toJSON = function() {
    var str_JSON = '"' + this.getName() + '":[';
    for (var i = 0; i < this.strsValue.length; i = i + 1) {
      var _sign = i == this.strsValue.length - 1 ? '' : ',';
      str_JSON += '' + this.strsValue[i] + _sign;
    }
    str_JSON += '],';
    return str_JSON;
  };
}

function DateTimeArrayField() {
  this.strType = 'DateTimeArrayField';
  this.getType = function() {
    return this.strType;
  }
  ;
  this.strName = '';
  this.strsValue = [];
  this.getName = function() {
    return this.strName;
  }
  ;
  this.setName = function(strName) {
    this.strName = strName;
  }
  ;
  this.getLength = function() {
    return strsValue.length;
  }
  ;
  this.getValue = function() {
    return this.strsValue;
  }
  ;
  this.setValue = function(strsValue) {
    for (var i = 0; i < strsValue.length; i = i + 1) {
      if (strsValue[i].length == 0)
        continue;
      if (strsValue[i].length != 19)
        throw 'Invalid datetime format: ' + strsValue[i];
      if (strsValue[i].match(/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/) == null)
        throw 'Invalid datetime format: ' + strsValue[i];
    }
    this.strsValue = strsValue;
  }
  ;
  this.getValueAt = function(nIndex) {
    return this.strsValue[nIndex];
  }
  ;
  this.setValueAt = function(nIndex, strValue) {
    if (strValue.length > 0 && strValue.length != 19)
      throw 'Invalid datetime format: ' + strValue;
    else if (strValue.match(/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/) == null)
      throw 'Invalid datetime format: ' + strValue;
    this.strsValue[nIndex] = strValue;
  }
  ;
  this.toXML = function(nIndentSize) {
    var strXML = '<DTAF N="' + this.strName + '"';
    strXML += ' V="';
    for (var i = 0; i < this.strsValue.length; i = i + 1) {
      if (i > 0)
        strXML += ',';
      strXML += this.strsValue[i];
    }
    strXML += '"/>';
    return strXML;
  }
  ;
  this.toXMLWithIndent = function(nIndentSize) {
    if (nIndentSize == null)
      nIndentSize = 0;
    for (var strIndent = '', i = 0; i < nIndentSize; i = i + 1)
      strIndent += '\t';
    var strXML = strIndent + '<DTAF N="' + this.strName + '"';
    strXML += ' V="';
    for (var i = 0; i < this.strsValue.length; i = i + 1) {
      if (i > 0)
        strXML += ',';
      strXML += this.strsValue[i];
    }
    strXML += '"/>\r\n';
    return strXML;
  }
  ;
  this.toJSONString = function() {
    var str_JSON = '\\"' + this.getName() + '\\":[';
    for (var i = 0; i < this.strsValue.length; i = i + 1) {
      var _sign = i == this.strsValue.length - 1 ? '' : ',';
      str_JSON += '' + this.strsValue[i] + _sign;
    }
    str_JSON += '],';
    return str_JSON;
  }
  ;
  this.toJSON = function() {
    var str_JSON = '"' + this.getName() + '":[';
    for (var i = 0; i < this.strsValue.length; i = i + 1) {
      var _sign = i == this.strsValue.length - 1 ? '' : ',';
      str_JSON += '' + this.strsValue[i] + _sign;
    }
    str_JSON += '],';
    return str_JSON;
  };
}

function CDOField() {
  this.strType = 'CDOField';
  this.getType = function() {
    return this.strType;
  }
  ;
  this.strName = '';
  this.cdoValue = null;
  this.getName = function() {
    return this.strName;
  }
  ;
  this.setName = function(strName) {
    this.strName = strName;
  }
  ;
  this.getValue = function() {
    return this.cdoValue;
  }
  ;
  this.setValue = function(cdoValue) {
    this.cdoValue = cdoValue;
  }
  ;
  this.toXML = function(nIndentSize) {
    var strXML = '<CDOF N="' + this.strName + '">';
    strXML += this.cdoValue.toXML(nIndentSize + 1);
    strXML += '</CDOF>';
    return strXML;
  }
  ;
  this.toXMLWithIndent = function(nIndentSize) {
    if (nIndentSize == null)
      nIndentSize = 0;
    for (var strIndent = '', i = 0; i < nIndentSize; i = i + 1)
      strIndent += '\t';
    var strXML = strIndent + '<CDOF N="' + this.strName + '">\r\n';
    strXML += this.cdoValue.toXMLWithIndent(nIndentSize + 1);
    strXML += strIndent + '</CDOF>\r\n';
    return strXML;
  }
  ;
  this.toJSON = function() {
    var str_JSON = '"' + this.getName() + '":' + this.cdoValue.toJSON() + ',';
    return str_JSON;
  }
  ;
  this.toJSONString = function() {
    var str_JSON = '\\"' + this.getName() + '\\":' + this.cdoValue.toJSON() + ',';
    return str_JSON;
  };
}

function CDOArrayField() {
  this.strType = 'CDOArrayField';
  this.getType = function() {
    return this.strType;
  }
  ;
  this.strName = '';
  this.cdosValue = null;
  this.getName = function() {
    return this.strName;
  }
  ;
  this.setName = function(strName) {
    this.strName = strName;
  }
  ;
  this.getLength = function() {
    return cdosValue.length;
  }
  ;
  this.getValue = function() {
    return this.cdosValue;
  }
  ;
  this.setValue = function(cdosValue) {
    this.cdosValue = cdosValue;
  }
  ;
  this.toXML = function(nIndentSize) {
    var strXML = '<CDOAF N="' + this.strName + '">';
    for (var i = 0; i < this.cdosValue.length; i = i + 1)
      strXML += this.cdosValue[i].toXML(nIndentSize + 1);
    strXML += '</CDOAF>';
    return strXML;
  }
  ;
  this.toXMLWithIndent = function(nIndentSize) {
    if (nIndentSize == null)
      nIndentSize = 0;
    for (var strIndent = '', i = 0; i < nIndentSize; i = i + 1)
      strIndent += '\t';
    var strXML = strIndent + '<CDOAF N="' + this.strName + '">\r\n';
    for (var i = 0; i < this.cdosValue.length; i = i + 1)
      strXML += this.cdosValue[i].toXMLWithIndent(nIndentSize + 1);
    strXML += strIndent + '</CDOAF>\r\n';
    return strXML;
  }
  ;
  this.toJSONString = function() {
    var str_JSON = '\\"' + this.getName() + '\\":[';
    for (var i = 0; i < this.cdosValue.length; i = i + 1) {
      var _sign = i == this.cdosValue.length - 1 ? '' : ',';
      str_JSON += '' + this.cdosValue[i].toJSON() + _sign;
    }
    str_JSON += '],';
    return str_JSON.toString();
  }
  ;
  this.toJSON = function() {
    var str_JSON = '"' + this.getName() + '":[';
    for (var i = 0; i < this.cdosValue.length; i = i + 1) {
      var _sign = i == this.cdosValue.length - 1 ? '' : ',';
      str_JSON += '' + this.cdosValue[i].toJSON() + _sign;
    }
    str_JSON += '],';
    return str_JSON;
  };
}

export function CDO() {
  this.hmItem = new HashMap;
  this.setField = function(strName, objField) {
    this.hmItem.put(strName, objField);
  }
  ;

  function findMatchedChar(nIndex, strText) {
    if (nIndex < 0)
      return -1;
    var chChar = strText.charAt(nIndex)
      , nCount = 0
      , nStartIndex = -1
      , nEndIndex = -1
      , chFind = ' ';
    switch (chChar) {
      case '(':
        chFind = ')';
        break;
      case '{':
        chFind = '}';
        break;
      case '[':
        chFind = ']';
        break;
      case ')':
        chFind = '(';
        break;
      case '}':
        chFind = '{';
        break;
      case ']':
        chFind = '[';
        break;
      default:
        return -1;
    }
    var i = 0
      , ch = null;
    switch (chChar) {
      case '(':
      case '{':
      case '[':
        for (i = nIndex + 1; i < strText.length; i = i + 1) {
          ch = strText.charAt(i);
          if (ch == chChar)
            nCount = nCount + 1;
          else if (ch == chFind)
            if (nCount === 0) {
              nEndIndex = i;
              break;
            } else
              nCount = nCount - 1;
        }
        return nEndIndex;
      case ')':
      case '}':
      case ']':
        for (i = nIndex - 1; i >= 0; i = i - 1) {
          ch = strText.charAt(i);
          if (ch == chChar)
            nCount = nCount + 1;
          else if (ch == chFind)
            if (nCount === 0) {
              nStartIndex = i;
              break;
            } else
              nCount = nCount - 1;
        }
        return nStartIndex;
      default:
        return -1;
    }
  }

  this.fromXMLText = function(xml) {
    var nodeCDO = new DOMParser().parseFromString(xml, 'text/xml').documentElement;
    return this.fromXML(nodeCDO);
  }
  ;
  this.fromXML = function(nodeCDO) {
    for (var nodes = nodeCDO.childNodes, i = 0; i < nodes.length; i = i + 1) {
      var node = nodes[i];
      if (node.nodeType != 1)
        continue;
      var strTag = node.tagName;
      switch (strTag) {
        case 'BYF':
          var strName = node.getAttribute('N')
            , strValue = node.getAttribute('V')
            , field = new ByteField(strName, eval(strValue));
          this.hmItem.put(strName, field);
          break;
        case 'SF':
          var strName = node.getAttribute('N')
            , strValue = node.getAttribute('V')
            , field = new ShortField(strName, eval(strValue));
          this.hmItem.put(strName, field);
          break;
        case 'NF':
          var strName = node.getAttribute('N')
            , strValue = node.getAttribute('V')
            , field = new IntegerField(strName, eval(strValue));
          this.hmItem.put(strName, field);
          break;
        case 'LF':
          var strName = node.getAttribute('N')
            , strValue = node.getAttribute('V')
            , field = new LongField(strName, eval(strValue));
          this.hmItem.put(strName, field);
          break;
        case 'FF':
          var strName = node.getAttribute('N')
            , strValue = node.getAttribute('V')
            , field = new FloatField(strName, eval(strValue));
          this.hmItem.put(strName, field);
          break;
        case 'DBLF':
          var strName = node.getAttribute('N')
            , strValue = node.getAttribute('V')
            , field = new DoubleField(strName, eval(strValue));
          this.hmItem.put(strName, field);
          break;
        case 'STRF':
          var strName = node.getAttribute('N')
            , strValue = node.getAttribute('V')
            , field = new StringField(strName, strValue);
          this.hmItem.put(strName, field);
          break;
        case 'BF':
          var strName = node.getAttribute('N')
            , strValue = node.getAttribute('V')
            , field = new BooleanField(strName, strValue);
          this.hmItem.put(strName, field);
          break;
        case 'DF':
          var strName = node.getAttribute('N')
            , strValue = node.getAttribute('V')
            , field = new DateField(strName, strValue);
          this.hmItem.put(strName, field);
          break;
        case 'TF':
          var strName = node.getAttribute('N')
            , strValue = node.getAttribute('V')
            , field = new TimeField(strName, strValue);
          this.hmItem.put(strName, field);
          break;
        case 'DTF':
          var strName = node.getAttribute('N')
            , strValue = node.getAttribute('V')
            , field = new DateTimeField(strName, strValue);
          this.hmItem.put(strName, field);
          break;
        case 'CDOF':
          for (var strName = node.getAttribute('N'), cdoValue = new CDO, firxFoxChildNodes = node.childNodes, firxFoxChileNode, ff = 0; ff < firxFoxChildNodes.length; ff = ff + 1)
            if (firxFoxChildNodes[ff])
              if (firxFoxChildNodes[ff].nodeType == 1) {
                firxFoxChileNode = firxFoxChildNodes[ff];
                break;
              }
          cdoValue.fromXML(firxFoxChileNode);
          var field = new CDOField;
          field.setName(strName);
          field.setValue(cdoValue);
          this.hmItem.put(strName, field);
          break;
        case 'BYAF':
          var strName = node.getAttribute('N')
            , strValue = node.getAttribute('V')
            , field = new ByteArrayField
            , arrValue = strValue.split(',');
          field.setName(strName);
          field.setValue(arrValue);
          this.hmItem.put(strName, field);
          break;
        case 'SAF':
          var strName = node.getAttribute('N')
            , strValue = node.getAttribute('V')
            , field = new ShortArrayField
            , arrValue = strValue.split(',');
          field.setName(strName);
          field.setValue(arrValue);
          this.hmItem.put(strName, field);
          break;
        case 'NAF':
          var strName = node.getAttribute('N')
            , strValue = node.getAttribute('V')
            , field = new IntegerArrayField
            , arrValue = strValue.split(',');
          field.setName(strName);
          field.setValue(arrValue);
          this.hmItem.put(strName, field);
          break;
        case 'LAF':
          var strName = node.getAttribute('N')
            , strValue = node.getAttribute('V')
            , field = new LongArrayField
            , arrValue = strValue.split(',');
          field.setName(strName);
          field.setValue(arrValue);
          this.hmItem.put(strName, field);
          break;
        case 'FAF':
          var strName = node.getAttribute('N')
            , strValue = node.getAttribute('V')
            , field = new FloatArrayField
            , arrValue = strValue.split(',');
          field.setName(strName);
          field.setValue(arrValue);
          this.hmItem.put(strName, field);
          break;
        case 'DBLAF':
          var strName = node.getAttribute('N')
            , strValue = node.getAttribute('V')
            , field = new DoubleArrayField
            , arrValue = strValue.split(',');
          field.setName(strName);
          field.setValue(arrValue);
          this.hmItem.put(strName, field);
          break;
        case 'STRAF':
          for (var strName = node.getAttribute('N'), field = new StringArrayField, items = node.childNodes, length = 0, firxFoxChildNodes = new Array(items.length), xx = 0, ff = 0; ff < items.length; ff = ff + 1)
            if (items[ff])
              if (items[ff].nodeType == 1) {
                firxFoxChildNodes[xx] = items[ff];
                xx = xx + 1;
              }
          length = xx;
          for (var arrValue = new Array(length), j = 1; j <= length; j = j + 1)
            if (firxFoxChildNodes[j - 1].text != undefined)
              arrValue[j - 1] = firxFoxChildNodes[j - 1].text;
            else
              arrValue[j - 1] = firxFoxChildNodes[j - 1].textContent;
          field.setName(strName);
          field.setValue(arrValue);
          this.hmItem.put(strName, field);
          break;
        case 'DAF':
          var strName = node.getAttribute('N')
            , strValue = node.getAttribute('V')
            , field = new DateArrayField
            , arrValue = strValue.split(',');
          field.setName(strName);
          field.setValue(arrValue);
          this.hmItem.put(strName, field);
          break;
        case 'TAF':
          var strName = node.getAttribute('N')
            , strValue = node.getAttribute('V')
            , field = new TimeArrayField
            , arrValue = strValue.split(',');
          field.setName(strName);
          field.setValue(arrValue);
          this.hmItem.put(strName, field);
          break;
        case 'DTAF':
          var strName = node.getAttribute('N')
            , strValue = node.getAttribute('V')
            , field = new DateTimeArrayField
            , arrValue = strValue.split(',');
          field.setName(strName);
          field.setValue(arrValue);
          this.hmItem.put(strName, field);
          break;
        case 'CDOAF':
          for (var strName = node.getAttribute('N'), field = new CDOArrayField, items = node.childNodes, length = 0, firxFoxChildNodes = new Array(items.length), xx = 0, ff = 0; ff < items.length; ff = ff + 1)
            if (items[ff])
              if (items[ff].nodeType == 1) {
                firxFoxChildNodes[xx] = items[ff];
                xx = xx + 1;
              }
          length = xx;
          for (var arrValue = new Array(length), j = 1; j <= length; j = j + 1) {
            var cdoValue = new CDO, childNode;
            childNode = firxFoxChildNodes[j - 1];
            cdoValue.fromXML(childNode);
            arrValue[j - 1] = cdoValue;
          }
          field.setName(strName);
          field.setValue(arrValue);
          this.hmItem.put(strName, field);
          break;
      }
    }
  }
  ;

  function getIndexValue(strIndex, cdoRoot) {
    var nIndex = 0;
    if (strIndex.charAt(0) >= '0' && strIndex.charAt(0) <= '9')
      eval('nIndex=' + strIndex);
    else
      return cdoRoot.getFieldValue(strIndex, cdoRoot);
    return nIndex;
  }

  this.getFieldValue = function(strFieldId) {
    return getFieldValue(strFieldId, this);
  }
  ;
  this.getFieldValue = function(strFieldId, cdoRoot) {
    var nDotIndex = strFieldId.indexOf('.');
    if (nDotIndex < 0) {
      var nArrayStartIndex = strFieldId.indexOf('[')
        , nArrayEndIndex = findMatchedChar(nArrayStartIndex, strFieldId);
      if (nArrayStartIndex < 0 && nArrayEndIndex < 0) {
        if (this.hmItem.exists(strFieldId) == false)
          return null;
        return this.hmItem.get(strFieldId).getValue();
      } else if (nArrayStartIndex >= 0 && nArrayEndIndex > 0 && nArrayEndIndex - nArrayStartIndex > 1) {
        var strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex)
          , nIndex = getIndexValue(strIndex, cdoRoot);
        return this.hmItem.get(strFieldId.substring(0, nArrayStartIndex)).getValue()[nIndex];
      } else
        throw 'Invalid FieldId ' + strFieldId;
    }
    var nArrayStartIndex = strFieldId.indexOf('[');
    if (nArrayStartIndex < 0 || nDotIndex < nArrayStartIndex) {
      var objField = this.hmItem.get(strFieldId.substring(0, nDotIndex));
      if (objField == null)
        return null;
      var objFieldValue = objField.getValue();
      if (objFieldValue instanceof CDO == false)
        throw 'Invalid FieldId ' + strFieldId;
      return objFieldValue.getFieldValue(strFieldId.substring(nDotIndex + 1), cdoRoot);
    }
    var nArrayEndIndex = findMatchedChar(nArrayStartIndex, strFieldId);
    if (nArrayEndIndex == -1)
      throw 'Invalid FieldId ' + strFieldId;
    var strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex)
      , nIndex = getIndexValue(strIndex, cdoRoot)
      , cdoField = this.hmItem.get(strFieldId.substring(0, nArrayStartIndex));
    if (cdoField instanceof CDOArrayField)
      return cdoField.getValue()[nIndex].getFieldValue(strFieldId.substring(nArrayEndIndex + 2), cdoRoot);
    else
      return this.hmItem.get(strFieldId.substring(0, nArrayStartIndex)).getValue()[nIndex];
  }
  ;
  this.getField = function(strFieldId) {
    return this.getField(strFieldId, this);
  }
  ;
  this.getField = function(strFieldId, cdoRoot) {
    if (strFieldId.lastIndexOf(']') == strFieldId.length - 1)
      throw 'Invalid FieldId ' + strFieldId;
    if (strFieldId.indexOf('.') < 0) {
      var nArrayStartIndex = strFieldId.indexOf('[')
        , nArrayEndIndex = strFieldId.indexOf(']');
      if (nArrayStartIndex < 0 && nArrayEndIndex < 0) {
        if (this.hmItem.exists(strFieldId) == false)
          return null;
        return this.hmItem.get(strFieldId);
      } else if (nArrayStartIndex >= 0 && nArrayEndIndex > 0 && nArrayEndIndex - nArrayStartIndex > 1)
        throw 'FieldId ' + strFieldId + ' is invalid';
    }
    var nDotIndex = strFieldId.indexOf('.')
      , nArrayStartIndex = strFieldId.indexOf('[');
    if (nArrayStartIndex < 0 || nDotIndex < nArrayStartIndex) {
      var field = this.hmItem.get(strFieldId.substring(0, nDotIndex));
      if (field == null)
        return null;
      else if (field instanceof CDOField == false)
        throw 'Invalid FieldId ' + strFieldId;
      return field.getValue().getField(strFieldId.substring(nDotIndex + 1), cdoRoot);
    }
    var nArrayEndIndex = findMatchedChar(nArrayStartIndex, strFieldId);
    if (nArrayEndIndex == -1)
      throw 'Invalid FieldId ' + strFieldId;
    var strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex)
      , nIndex = getIndexValue(strIndex, cdoRoot)
      , field = this.hmItem.get(strFieldId.substring(0, nArrayStartIndex));
    if (field instanceof CDOArrayField == false)
      throw 'Invalid FieldId ' + strFieldId;
    return field.getValue()[nIndex].getField(strFieldId.substring(nArrayEndIndex + 2), cdoRoot);
  }
  ;
  this.getByteValue = function(strFieldId) {
    return this.getFieldValue(strFieldId, this) & 255;
  }
  ;
  this.getShortValue = function(strFieldId) {
    return this.getFieldValue(strFieldId) & 65535;
  }
  ;
  this.getIntegerValue = function(strFieldId) {
    return this.getFieldValue(strFieldId) & 4294967295;
  }
  ;
  this.getLongValue = function(strFieldId) {
    return this.getFieldValue(strFieldId);
  }
  ;
  this.getFloatValue = function(strFieldId) {
    return this.getFieldValue(strFieldId);
  }
  ;
  this.getDoubleValue = function(strFieldId) {
    return this.getFieldValue(strFieldId);
  }
  ;
  this.getStringValue = function(strFieldId) {
    return this.getFieldValue(strFieldId);
  }
  ;
  this.getBooleanValue = function(strFieldId) {
    return this.getFieldValue(strFieldId);
  }
  ;
  this.getDateValue = function(strFieldId) {
    var strDate = this.getFieldValue(strFieldId);
    if (strDate.length == 0 || strDate.length == 10) {
      var date = new DateField('', '');
      date.setValue(strDate);
      return strDate;
    } else if (strDate.length == 19) {
      var dateTime = new DateTimeField('', '');
      dateTime.setValue(strDate);
      return strDate.substring(0, 10);
    } else
      return null;
  }
  ;
  this.getTimeValue = function(strFieldId) {
    var strTime = this.getFieldValue(strFieldId);
    if (strTime.length == 0 || strTime.length == 8) {
      var time = new TimeField('', '');
      time.setValue(strTime);
      return strTime;
    } else if (strTime.length == 19) {
      var dateTime = new DateTimeField('', '');
      dateTime.setValue(strTime);
      return strTime.substring(11, 19);
    } else
      return null;
  }
  ;
  this.getDateTimeValue = function(strFieldId) {
    var strDateTime = this.getFieldValue(strFieldId);
    if (strDateTime.length == 0)
      return strDateTime;
    else if (strDateTime.length == 19) {
      var dateTime = new DateTimeField('', '');
      dateTime.setValue(strDateTime);
      return strDateTime;
    } else
      return null;
  }
  ;
  this.getCDOValue = function(strFieldId) {
    return this.getFieldValue(strFieldId);
  }
  ;
  this.getByteArrayValue = function(strFieldId) {
    return this.getFieldValue(strFieldId, this);
  }
  ;
  this.getShortArrayValue = function(strFieldId) {
    return this.getFieldValue(strFieldId, this);
  }
  ;
  this.getIntegerArrayValue = function(strFieldId) {
    return this.getFieldValue(strFieldId, this);
  }
  ;
  this.getLongArrayValue = function(strFieldId) {
    return this.getFieldValue(strFieldId, this);
  }
  ;
  this.getFloatArrayValue = function(strFieldId) {
    return this.getFieldValue(strFieldId, this);
  }
  ;
  this.getDoubleArrayValue = function(strFieldId) {
    return this.getFieldValue(strFieldId, this);
  }
  ;
  this.getStringArrayValue = function(strFieldId) {
    return this.getFieldValue(strFieldId, this);
  }
  ;
  this.getDateArrayValue = function(strFieldId) {
    return this.getFieldValue(strFieldId, this);
  }
  ;
  this.getTimeArrayValue = function(strFieldId) {
    return this.getFieldValue(strFieldId, this);
  }
  ;
  this.getCDOArrayValue = function(strFieldId) {
    return this.getFieldValue(strFieldId, this);
  }
  ;
  this.setByteValue = function(strFieldId, byValue) {
    if (strFieldId.charAt(strFieldId.length - 1) == ']') {
      var strIndex = ''
        , nArrayEndIndex = strFieldId.length - 1
        , nArrayStartIndex = findMatchedChar(nArrayEndIndex, strFieldId);
      if (nArrayStartIndex == -1)
        throw 'Invalid FieldId ' + strFieldId;
      var field = getField(strFieldId.substring(0, nArrayStartIndex));
      strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
      var nIndex = getIndexValue(strIndex, this);
      field.setValueAt(nIndex, byValue);
      return;
    }
    try {
      var field = this.getField(strFieldId);
      field.setValue(byValue);
    } catch (e) {
      for (var nDotIndex = -1, i = strFieldId.length - 1; i >= 0; i = i - 1) {
        var ch = strFieldId.charAt(i);
        if (ch == '.') {
          nDotIndex = i;
          break;
        }
        if (ch == ']')
          throw 'Invalid FieldId ' + strFieldId;
      }
      var objParentValue = null;
      if (nDotIndex == -1)
        objParentValue = this;
      else {
        objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
        if (objParentValue instanceof CDO == false)
          throw 'Type mismatch';
      }
      var strFieldName = strFieldId.substring(nDotIndex + 1)
        , field = new ByteField(strFieldName, byValue);
      objParentValue.setField(strFieldName, field);
    }
  }
  ;
  this.setShortValue = function(strFieldId, shValue) {
    if (strFieldId.charAt(strFieldId.length - 1) == ']') {
      var strIndex = ''
        , nArrayEndIndex = strFieldId.length - 1
        , nArrayStartIndex = findMatchedChar(nArrayEndIndex, strFieldId);
      if (nArrayStartIndex == -1)
        throw 'Invalid FieldId ' + strFieldId;
      var field = getField(strFieldId.substring(0, nArrayStartIndex));
      strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
      var nIndex = getIndexValue(strIndex, this);
      field.setValueAt(nIndex, shValue);
      return;
    }
    try {
      var field = this.getField(strFieldId);
      field.setValue(shValue);
    } catch (e) {
      for (var nDotIndex = -1, i = strFieldId.length - 1; i >= 0; i = i - 1) {
        var ch = strFieldId.charAt(i);
        if (ch == '.') {
          nDotIndex = i;
          break;
        }
        if (ch == ']')
          throw 'Invalid FieldId ' + strFieldId;
      }
      var objParentValue = null;
      if (nDotIndex == -1)
        objParentValue = this;
      else {
        objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
        if (objParentValue instanceof CDO == false)
          throw 'Type mismatch';
      }
      var strFieldName = strFieldId.substring(nDotIndex + 1)
        , field = new ShortField(strFieldName, shValue);
      objParentValue.setField(strFieldName, field);
    }
  }
  ;
  this.setIntegerValue = function(strFieldId, nValue) {
    if (strFieldId.charAt(strFieldId.length - 1) == ']') {
      var strIndex = ''
        , nArrayEndIndex = strFieldId.length - 1
        , nArrayStartIndex = findMatchedChar(nArrayEndIndex, strFieldId);
      if (nArrayStartIndex == -1)
        throw 'Invalid FieldId ' + strFieldId;
      var field = getField(strFieldId.substring(0, nArrayStartIndex));
      strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
      var nIndex = getIndexValue(strIndex, this);
      field.setValueAt(nIndex, nValue);
      return;
    }
    try {
      var field = this.getField(strFieldId);
      field.setValue(nValue);
    } catch (e) {
      for (var nDotIndex = -1, i = strFieldId.length - 1; i >= 0; i = i - 1) {
        var ch = strFieldId.charAt(i);
        if (ch == '.') {
          nDotIndex = i;
          break;
        }
        if (ch == ']')
          throw 'Invalid FieldId ' + strFieldId;
      }
      var objParentValue = null;
      if (nDotIndex == -1)
        objParentValue = this;
      else {
        objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
        if (objParentValue instanceof CDO == false)
          throw 'Type mismatch';
      }
      var strFieldName = strFieldId.substring(nDotIndex + 1)
        , field = new IntegerField(strFieldName, nValue);
      objParentValue.setField(strFieldName, field);
    }
  }
  ;
  this.setLongValue = function(strFieldId, lValue) {
    if (strFieldId.charAt(strFieldId.length - 1) == ']') {
      var strIndex = ''
        , nArrayEndIndex = strFieldId.length - 1
        , nArrayStartIndex = findMatchedChar(nArrayEndIndex, strFieldId);
      if (nArrayStartIndex == -1)
        throw 'Invalid FieldId ' + strFieldId;
      var field = getField(strFieldId.substring(0, nArrayStartIndex));
      strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
      var nIndex = getIndexValue(strIndex, this);
      field.setValueAt(nIndex, lValue);
      return;
    }
    try {
      var field = this.getField(strFieldId);
      field.setValue(lValue);
    } catch (e) {
      for (var nDotIndex = -1, i = strFieldId.length - 1; i >= 0; i = i - 1) {
        var ch = strFieldId.charAt(i);
        if (ch == '.') {
          nDotIndex = i;
          break;
        }
        if (ch == ']')
          throw 'Invalid FieldId ' + strFieldId;
      }
      var objParentValue = null;
      if (nDotIndex == -1)
        objParentValue = this;
      else {
        objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
        if (objParentValue instanceof CDO == false)
          throw 'Type mismatch';
      }
      var strFieldName = strFieldId.substring(nDotIndex + 1)
        , field = new LongField(strFieldName, lValue);
      objParentValue.setField(strFieldName, field);
    }
  }
  ;
  this.setBooleanValue = function(strFieldId, bValue) {
    if (strFieldId.charAt(strFieldId.length - 1) == ']') {
      var strIndex = ''
        , nArrayEndIndex = strFieldId.length - 1
        , nArrayStartIndex = findMatchedChar(nArrayEndIndex, strFieldId);
      if (nArrayStartIndex == -1)
        throw 'Invalid FieldId ' + strFieldId;
      var field = getField(strFieldId.substring(0, nArrayStartIndex));
      strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
      var nIndex = getIndexValue(strIndex, this);
      field.setValueAt(nIndex, bValue);
      return;
    }
    try {
      var field = this.getField(strFieldId);
      field.setValue(bValue);
    } catch (e) {
      for (var nDotIndex = -1, i = strFieldId.length - 1; i >= 0; i = i - 1) {
        var ch = strFieldId.charAt(i);
        if (ch == '.') {
          nDotIndex = i;
          break;
        }
        if (ch == ']')
          throw 'Invalid FieldId ' + strFieldId;
      }
      var objParentValue = null;
      if (nDotIndex == -1)
        objParentValue = this;
      else {
        objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
        if (objParentValue instanceof CDO == false)
          throw 'Type mismatch';
      }
      var strFieldName = strFieldId.substring(nDotIndex + 1)
        , field = new BooleanField(strFieldName, bValue);
      objParentValue.setField(strFieldName, field);
    }
  }
  ;
  this.setFloatValue = function(strFieldId, fValue) {
    if (strFieldId.charAt(strFieldId.length - 1) == ']') {
      var strIndex = ''
        , nArrayEndIndex = strFieldId.length - 1
        , nArrayStartIndex = findMatchedChar(nArrayEndIndex, strFieldId);
      if (nArrayStartIndex == -1)
        throw 'Invalid FieldId ' + strFieldId;
      var field = getField(strFieldId.substring(0, nArrayStartIndex));
      strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
      var nIndex = getIndexValue(strIndex, this);
      field.setValueAt(nIndex, fValue);
      return;
    }
    try {
      var field = this.getField(strFieldId);
      field.setValue(fValue);
    } catch (e) {
      for (var nDotIndex = -1, i = strFieldId.length - 1; i >= 0; i = i - 1) {
        var ch = strFieldId.charAt(i);
        if (ch == '.') {
          nDotIndex = i;
          break;
        }
        if (ch == ']')
          throw 'Invalid FieldId ' + strFieldId;
      }
      var objParentValue = null;
      if (nDotIndex == -1)
        objParentValue = this;
      else {
        objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
        if (objParentValue instanceof CDO == false)
          throw 'Type mismatch';
      }
      var strFieldName = strFieldId.substring(nDotIndex + 1)
        , field = new FloatField(strFieldName, fValue);
      objParentValue.setField(strFieldName, field);
    }
  }
  ;
  this.setDoubleValue = function(strFieldId, dblValue) {
    if (strFieldId.charAt(strFieldId.length - 1) == ']') {
      var strIndex = ''
        , nArrayEndIndex = strFieldId.length - 1
        , nArrayStartIndex = findMatchedChar(nArrayEndIndex, strFieldId);
      if (nArrayStartIndex == -1)
        throw 'Invalid FieldId ' + strFieldId;
      var field = getField(strFieldId.substring(0, nArrayStartIndex));
      strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
      var nIndex = getIndexValue(strIndex, this);
      field.setValueAt(nIndex, dblValue);
      return;
    }
    try {
      var field = this.getField(strFieldId);
      field.setValue(dblValue);
    } catch (e) {
      for (var nDotIndex = -1, i = strFieldId.length - 1; i >= 0; i = i - 1) {
        var ch = strFieldId.charAt(i);
        if (ch == '.') {
          nDotIndex = i;
          break;
        }
        if (ch == ']')
          throw 'Invalid FieldId ' + strFieldId;
      }
      var objParentValue = null;
      if (nDotIndex == -1)
        objParentValue = this;
      else {
        objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
        if (objParentValue instanceof CDO == false)
          throw 'Type mismatch';
      }
      var strFieldName = strFieldId.substring(nDotIndex + 1)
        , field = new DoubleField(strFieldName, dblValue);
      objParentValue.setField(strFieldName, field);
    }
  }
  ;
  this.setStringValue = function(strFieldId, strValue) {
    if (strFieldId.charAt(strFieldId.length - 1) == ']') {
      var strIndex = ''
        , nArrayEndIndex = strFieldId.length - 1
        , nArrayStartIndex = findMatchedChar(nArrayEndIndex, strFieldId);
      if (nArrayStartIndex == -1)
        throw 'Invalid FieldId ' + strFieldId;
      var field = getField(strFieldId.substring(0, nArrayStartIndex));
      strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
      var nIndex = getIndexValue(strIndex, this);
      field.setValueAt(nIndex, strValue);
      return;
    }
    try {
      var field = this.getField(strFieldId);
      field.setValue(strValue);
    } catch (e) {
      for (var nDotIndex = -1, i = strFieldId.length - 1; i >= 0; i = i - 1) {
        var ch = strFieldId.charAt(i);
        if (ch == '.') {
          nDotIndex = i;
          break;
        }
        if (ch == ']')
          throw 'Invalid FieldId ' + strFieldId;
      }
      var objParentValue = null;
      if (nDotIndex == -1)
        objParentValue = this;
      else {
        objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
        if (objParentValue instanceof CDO == false)
          throw 'Type mismatch';
      }
      var strFieldName = strFieldId.substring(nDotIndex + 1)
        , field = new StringField(strFieldName, strValue);
      objParentValue.setField(strFieldName, field);
    }
  }
  ;
  this.setDateValue = function(strFieldId, dateValue) {
    if (strFieldId.charAt(strFieldId.length - 1) == ']') {
      var strIndex = ''
        , nArrayEndIndex = strFieldId.length - 1
        , nArrayStartIndex = findMatchedChar(nArrayEndIndex, strFieldId);
      if (nArrayStartIndex == -1)
        throw 'Invalid FieldId ' + strFieldId;
      var field = getField(strFieldId.substring(0, nArrayStartIndex));
      strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
      var nIndex = getIndexValue(strIndex, this);
      field.setValueAt(nIndex, dateValue);
      return;
    }
    try {
      var field = this.getField(strFieldId);
      field.setValue(dateValue);
    } catch (e) {
      for (var nDotIndex = -1, i = strFieldId.length - 1; i >= 0; i = i - 1) {
        var ch = strFieldId.charAt(i);
        if (ch == '.') {
          nDotIndex = i;
          break;
        }
        if (ch == ']')
          throw 'Invalid FieldId ' + strFieldId;
      }
      var objParentValue = null;
      if (nDotIndex == -1)
        objParentValue = this;
      else {
        objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
        if (objParentValue instanceof CDO == false)
          throw 'Type mismatch';
      }
      var strFieldName = strFieldId.substring(nDotIndex + 1)
        , field = new DateField(strFieldName, dateValue);
      objParentValue.setField(strFieldName, field);
    }
  }
  ;
  this.setTimeValue = function(strFieldId, timeValue) {
    if (strFieldId.charAt(strFieldId.length - 1) == ']') {
      var strIndex = ''
        , nArrayEndIndex = strFieldId.length - 1
        , nArrayStartIndex = findMatchedChar(nArrayEndIndex, strFieldId);
      if (nArrayStartIndex == -1)
        throw 'Invalid FieldId ' + strFieldId;
      var field = getField(strFieldId.substring(0, nArrayStartIndex));
      strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
      var nIndex = getIndexValue(strIndex, this);
      field.setValueAt(nIndex, timeValue);
      return;
    }
    try {
      var field = this.getField(strFieldId);
      field.setValue(timeValue);
    } catch (e) {
      for (var nDotIndex = -1, i = strFieldId.length - 1; i >= 0; i = i - 1) {
        var ch = strFieldId.charAt(i);
        if (ch == '.') {
          nDotIndex = i;
          break;
        }
        if (ch == ']')
          throw 'Invalid FieldId ' + strFieldId;
      }
      var objParentValue = null;
      if (nDotIndex == -1)
        objParentValue = this;
      else {
        objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
        if (objParentValue instanceof CDO == false)
          throw 'Type mismatch';
      }
      var strFieldName = strFieldId.substring(nDotIndex + 1)
        , field = new TimeField(strFieldName, timeValue);
      objParentValue.setField(strFieldName, field);
    }
  }
  ;
  this.setDateTimeValue = function(strFieldId, dtValue) {
    if (strFieldId.charAt(strFieldId.length - 1) == ']') {
      var strIndex = ''
        , nArrayEndIndex = strFieldId.length - 1
        , nArrayStartIndex = findMatchedChar(nArrayEndIndex, strFieldId);
      if (nArrayStartIndex == -1)
        throw 'Invalid FieldId ' + strFieldId;
      var field = getField(strFieldId.substring(0, nArrayStartIndex));
      strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
      var nIndex = getIndexValue(strIndex, this);
      field.setValueAt(nIndex, dtValue);
      return;
    }
    try {
      var field = this.getField(strFieldId);
      field.setValue(dtValue);
    } catch (e) {
      for (var nDotIndex = -1, i = strFieldId.length - 1; i >= 0; i = i - 1) {
        var ch = strFieldId.charAt(i);
        if (ch == '.') {
          nDotIndex = i;
          break;
        }
        if (ch == ']')
          throw 'Invalid FieldId ' + strFieldId;
      }
      var objParentValue = null;
      if (nDotIndex == -1)
        objParentValue = this;
      else {
        objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
        if (objParentValue instanceof CDO == false)
          throw 'Type mismatch';
      }
      var strFieldName = strFieldId.substring(nDotIndex + 1)
        , field = new DateTimeField(strFieldName, dtValue);
      objParentValue.setField(strFieldName, field);
    }
  }
  ;
  this.setCDOValue = function(strFieldId, cdoValue) {
    if (strFieldId.charAt(strFieldId.length - 1) == ']') {
      var strIndex = ''
        , nArrayEndIndex = strFieldId.length - 1
        , nArrayStartIndex = findMatchedChar(nArrayEndIndex, strFieldId);
      if (nArrayStartIndex == -1)
        throw 'Invalid FieldId ' + strFieldId;
      var field = getField(strFieldId.substring(0, nArrayStartIndex));
      strIndex = strFieldId.substring(nArrayStartIndex + 1, nArrayEndIndex);
      var nIndex = getIndexValue(strIndex, this);
      field.setValueAt(nIndex, cdoValue);
      return;
    }
    try {
      var field = this.getField(strFieldId);
      field.setValue(cdoValue);
    } catch (e) {
      for (var nDotIndex = -1, i = strFieldId.length - 1; i >= 0; i = i - 1) {
        var ch = strFieldId.charAt(i);
        if (ch == '.') {
          nDotIndex = i;
          break;
        }
        if (ch == ']')
          throw 'Invalid FieldId ' + strFieldId;
      }
      var objParentValue = null;
      if (nDotIndex == -1)
        objParentValue = this;
      else {
        objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
        if (objParentValue instanceof CDO == false)
          throw 'Type mismatch';
      }
      var strFieldName = strFieldId.substring(nDotIndex + 1)
        , field = new CDOField;
      field.setName(strFieldName);
      field.setValue(cdoValue);
      objParentValue.setField(strFieldName, field);
    }
  }
  ;
  this.setByteArrayValue = function(strFieldId, bysValue) {
    try {
      var field = this.getField(strFieldId);
      field.setValue(bysValue);
    } catch (e) {
      for (var nDotIndex = -1, i = strFieldId.length - 1; i >= 0; i = i - 1) {
        var ch = strFieldId.charAt(i);
        if (ch == '.') {
          nDotIndex = i;
          break;
        }
        if (ch == ']')
          throw 'Invalid FieldId ' + strFieldId;
      }
      var objParentValue = null;
      if (nDotIndex == -1)
        objParentValue = this;
      else {
        objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
        if (objParentValue instanceof CDO == false)
          throw 'Type mismatch';
      }
      var strFieldName = strFieldId.substring(nDotIndex + 1)
        , field = new ByteArrayField;
      field.setName(strFieldName);
      field.setValue(bysValue);
      objParentValue.setField(strFieldName, field);
    }
  }
  ;
  this.setShortArrayValue = function(strFieldId, shsValue) {
    try {
      var field = this.getField(strFieldId);
      field.setValue(shsValue);
    } catch (e) {
      for (var nDotIndex = -1, i = strFieldId.length - 1; i >= 0; i = i - 1) {
        var ch = strFieldId.charAt(i);
        if (ch == '.') {
          nDotIndex = i;
          break;
        }
        if (ch == ']')
          throw 'Invalid FieldId ' + strFieldId;
      }
      var objParentValue = null;
      if (nDotIndex == -1)
        objParentValue = this;
      else {
        objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
        if (objParentValue instanceof CDO == false)
          throw 'Type mismatch';
      }
      var strFieldName = strFieldId.substring(nDotIndex + 1)
        , field = new ShortArrayField;
      field.setName(strFieldName);
      field.setValue(shsValue);
      objParentValue.setField(strFieldName, field);
    }
  }
  ;
  this.setIntegerArrayValue = function(strFieldId, nsValue) {
    try {
      var field = this.getField(strFieldId);
      field.setValue(nsValue);
    } catch (e) {
      for (var nDotIndex = -1, i = strFieldId.length - 1; i >= 0; i = i - 1) {
        var ch = strFieldId.charAt(i);
        if (ch == '.') {
          nDotIndex = i;
          break;
        }
        if (ch == ']')
          throw 'Invalid FieldId ' + strFieldId;
      }
      var objParentValue = null;
      if (nDotIndex == -1)
        objParentValue = this;
      else {
        objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
        if (objParentValue instanceof CDO == false)
          throw 'Type mismatch';
      }
      var strFieldName = strFieldId.substring(nDotIndex + 1)
        , field = new IntegerArrayField;
      field.setName(strFieldName);
      field.setValue(nsValue);
      objParentValue.setField(strFieldName, field);
    }
  }
  ;
  this.setLongArrayValue = function(strFieldId, lsValue) {
    try {
      var field = this.getField(strFieldId);
      field.setValue(lsValue);
    } catch (e) {
      for (var nDotIndex = -1, i = strFieldId.length - 1; i >= 0; i = i - 1) {
        var ch = strFieldId.charAt(i);
        if (ch == '.') {
          nDotIndex = i;
          break;
        }
        if (ch == ']')
          throw 'Invalid FieldId ' + strFieldId;
      }
      var objParentValue = null;
      if (nDotIndex == -1)
        objParentValue = this;
      else {
        objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
        if (objParentValue instanceof CDO == false)
          throw 'Type mismatch';
      }
      var strFieldName = strFieldId.substring(nDotIndex + 1)
        , field = new LongArrayField;
      field.setName(strFieldName);
      field.setValue(lsValue);
      objParentValue.setField(strFieldName, field);
    }
  }
  ;
  this.setFloatArrayValue = function(strFieldId, fsValue) {
    try {
      var field = this.getField(strFieldId);
      field.setValue(fsValue);
    } catch (e) {
      for (var nDotIndex = -1, i = strFieldId.length - 1; i >= 0; i = i - 1) {
        var ch = strFieldId.charAt(i);
        if (ch == '.') {
          nDotIndex = i;
          break;
        }
        if (ch == ']')
          throw 'Invalid FieldId ' + strFieldId;
      }
      var objParentValue = null;
      if (nDotIndex == -1)
        objParentValue = this;
      else {
        objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
        if (objParentValue instanceof CDO == false)
          throw 'Type mismatch';
      }
      var strFieldName = strFieldId.substring(nDotIndex + 1)
        , field = new FloatArrayField;
      field.setName(strFieldName);
      field.setValue(fsValue);
      objParentValue.setField(strFieldName, field);
    }
  }
  ;
  this.setDoubleArrayValue = function(strFieldId, dblsValue) {
    try {
      var field = this.getField(strFieldId);
      field.setValue(dblsValue);
    } catch (e) {
      for (var nDotIndex = -1, i = strFieldId.length - 1; i >= 0; i = i - 1) {
        var ch = strFieldId.charAt(i);
        if (ch == '.') {
          nDotIndex = i;
          break;
        }
        if (ch == ']')
          throw 'Invalid FieldId ' + strFieldId;
      }
      var objParentValue = null;
      if (nDotIndex == -1)
        objParentValue = this;
      else {
        objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
        if (objParentValue instanceof CDO == false)
          throw 'Type mismatch';
      }
      var strFieldName = strFieldId.substring(nDotIndex + 1)
        , field = new DoubleArrayField;
      field.setName(strFieldName);
      field.setValue(dblsValue);
      objParentValue.setField(strFieldName, field);
    }
  }
  ;
  this.setStringArrayValue = function(strFieldId, strsValue) {
    for (var strsXMLValue = new Array(strsValue.length), i = 0; i < strsValue.length; i = i + 1)
      strsXMLValue[i] = strsValue[i];
    strsValue = strsXMLValue;
    try {
      var field = this.getField(strFieldId);
      field.setValue(strsValue);
    } catch (e) {
      for (var nDotIndex = -1, i = strFieldId.length - 1; i >= 0; i = i - 1) {
        var ch = strFieldId.charAt(i);
        if (ch == '.') {
          nDotIndex = i;
          break;
        }
        if (ch == ']')
          throw 'Invalid FieldId ' + strFieldId;
      }
      var objParentValue = null;
      if (nDotIndex == -1)
        objParentValue = this;
      else {
        objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
        if (objParentValue instanceof CDO == false)
          throw 'Type mismatch';
      }
      var strFieldName = strFieldId.substring(nDotIndex + 1)
        , field = new StringArrayField;
      field.setName(strFieldName);
      field.setValue(strsValue);
      objParentValue.setField(strFieldName, field);
    }
  }
  ;
  this.setDateArrayValue = function(strFieldId, strsValue) {
    try {
      var field = this.getField(strFieldId);
      field.setValue(strsValue);
    } catch (e) {
      for (var nDotIndex = -1, i = strFieldId.length - 1; i >= 0; i = i - 1) {
        var ch = strFieldId.charAt(i);
        if (ch == '.') {
          nDotIndex = i;
          break;
        }
        if (ch == ']')
          throw 'Invalid FieldId ' + strFieldId;
      }
      var objParentValue = null;
      if (nDotIndex == -1)
        objParentValue = this;
      else {
        objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
        if (objParentValue instanceof CDO == false)
          throw 'Type mismatch';
      }
      var strFieldName = strFieldId.substring(nDotIndex + 1)
        , field = new DateArrayField;
      field.setName(strFieldName);
      field.setValue(strsValue);
      objParentValue.setField(strFieldName, field);
    }
  }
  ;
  this.setTimeArrayValue = function(strFieldId, strsValue) {
    try {
      var field = this.getField(strFieldId);
      field.setValue(strsValue);
    } catch (e) {
      for (var nDotIndex = -1, i = strFieldId.length - 1; i >= 0; i = i - 1) {
        var ch = strFieldId.charAt(i);
        if (ch == '.') {
          nDotIndex = i;
          break;
        }
        if (ch == ']')
          throw 'Invalid FieldId ' + strFieldId;
      }
      var objParentValue = null;
      if (nDotIndex == -1)
        objParentValue = this;
      else {
        objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
        if (objParentValue instanceof CDO == false)
          throw 'Type mismatch';
      }
      var strFieldName = strFieldId.substring(nDotIndex + 1)
        , field = new TimeArrayField;
      field.setName(strFieldName);
      field.setValue(strsValue);
      objParentValue.setField(strFieldName, field);
    }
  }
  ;
  this.setDateTimeArrayValue = function(strFieldId, strsValue) {
    try {
      var field = this.getField(strFieldId);
      field.setValue(strsValue);
    } catch (e) {
      for (var nDotIndex = -1, i = strFieldId.length - 1; i >= 0; i = i - 1) {
        var ch = strFieldId.charAt(i);
        if (ch == '.') {
          nDotIndex = i;
          break;
        }
        if (ch == ']')
          throw 'Invalid FieldId ' + strFieldId;
      }
      var objParentValue = null;
      if (nDotIndex == -1)
        objParentValue = this;
      else {
        objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
        if (objParentValue instanceof CDO == false)
          throw 'Type mismatch';
      }
      var strFieldName = strFieldId.substring(nDotIndex + 1)
        , field = new DateTimeArrayField;
      field.setName(strFieldName);
      field.setValue(strsValue);
      objParentValue.setField(strFieldName, field);
    }
  }
  ;
  this.setCDOArrayValue = function(strFieldId, cdosValue) {
    try {
      var field = this.getField(strFieldId);
      field.setValue(cdosValue);
    } catch (e) {
      for (var nDotIndex = -1, i = strFieldId.length - 1; i >= 0; i = i - 1) {
        var ch = strFieldId.charAt(i);
        if (ch == '.') {
          nDotIndex = i;
          break;
        }
        if (ch == ']')
          throw 'Invalid FieldId ' + strFieldId;
      }
      var objParentValue = null;
      if (nDotIndex == -1)
        objParentValue = this;
      else {
        objParentValue = this.getFieldValue(strFieldId.substring(0, nDotIndex), this);
        if (objParentValue instanceof CDO == false)
          throw 'Type mismatch';
      }
      var strFieldName = strFieldId.substring(nDotIndex + 1)
        , field = new CDOArrayField;
      field.setName(strFieldName);
      field.setValue(cdosValue);
      objParentValue.setField(strFieldName, field);
    }
  }
  ;
  this.getFields = function() {
    for (var arrKeys = this.hmItem.getKeys(), nSize = arrKeys.length, arrFields = [], i = 0; i < nSize; i = i + 1)
      arrFields[i] = this.getField(arrKeys[i]);
    return arrFields;
  }
  ;
  this.exists = function(strFieldId) {
    var field = this.getField(strFieldId);
    if (field == null)
      return false;
    return true;
  }
  ;
  this.removeField = function(strFieldId) {
    var field = this.hmItem.remove(strFieldId);
    if (field != null)
      return;
    var fieldId = parseFieldId(strFieldId);
    if (fieldId == null)
      throw new RuntimeException('Invalid FieldId ' + strFieldId);
    if (fieldId.nType == 1) {
      var nDotIndex = strFieldId.lastIndexOf('.');
      this.getCDOValue(strFieldId.substring(0, nDotIndex)).removeField(strFieldId.substring(nDotIndex + 1));
      return;
    }
    var nIndex = getIndexValue(fieldId.strIndexFieldId, this)
      , fieldIdMain = parseFieldId(fieldId.strMainFieldId);
    field = this.getField(fieldIdMain.strFieldId, this);
    field.getValue().splice(nIndex, 1);
  }
  ;
  this.toXML = function(nIndentSize) {
    var strXML = '<CDO>';
    for (var arrItems = this.hmItem.getValues(), i = 0; i < arrItems.length; i = i + 1)
      strXML += arrItems[i].toXML(nIndentSize + 1);
    strXML += '</CDO>';
    return strXML;
  }
  ;
  this.toXMLWithIndent = function(nIndentSize) {
    if (nIndentSize == null)
      nIndentSize = 0;
    for (var strIndent = '', i = 0; i < nIndentSize; i = i + 1)
      strIndent += '\t';
    var strXML = strIndent + '<CDO>\r\n';
    for (var arrItems = this.hmItem.getValues(), i = 0; i < arrItems.length; i = i + 1)
      strXML += arrItems[i].toXMLWithIndent(nIndentSize + 1);
    strXML += strIndent + '</CDO>\r\n';
    return strXML;
  }
  ;
  this.toJSON = function() {
    var str_JSON = '{';
    for (var arrItems = this.hmItem.getValues(), i = 0; i < arrItems.length; i = i + 1)
      str_JSON += arrItems[i].toJSON();
    var _lastComma = str_JSON.lastIndexOf(',')
      , _length = str_JSON.length;
    if (_lastComma == _length - 1)
      str_JSON = str_JSON.substring(0, _lastComma);
    str_JSON += '}';
    return str_JSON;
  }
  ;
  this.toJSONString = function() {
    var str_JSON = '{';
    for (var arrItems = this.hmItem.getValues(), i = 0; i < arrItems.length; i = i + 1)
      str_JSON += arrItems[i].toJSONString();
    var _lastComma = str_JSON.lastIndexOf(',')
      , _length = str_JSON.length;
    if (_lastComma == _length - 1)
      str_JSON = str_JSON.substring(0, _lastComma);
    str_JSON += '}';
    return str_JSON;
  }
  ;
  this.toString = function() {
    return this.toJSONString();
  };
}

