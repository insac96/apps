import Vue from 'vue'

const color = {
  hexToArray (hex) {
    if(!hex) return null

    hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => {
      return r + r + g + g + b + b;
    })

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },

  rgbToArray (rgb) {
    if(!rgb) return null

    const result = rgb.replace(/^(rgb|rgba)\(/,'').replace(/\)$/,'').replace(/\s/g,'').split(',')

    return {
      r: result[0],
      g: result[1],
      b: result[2]
    }
  },

  isHex (color) {
    return /^[#]/.test(color)
  },

  isRGB (color) {
    return /^rgb/.test(color)
  },

  isRGBA (color) {
    return /^rgba/.test(color)
  },

  isVar (color) {
    const vars = [
      'primary','success','danger','warn',
      'dark','light','gray',
      'background','text',
      'content-1'
    ]
    return vars.includes(color)
  },

  getVariable(styles, propertyName) {
    return String(styles.getPropertyValue(propertyName)).trim();
  },

  get (color) {
    let rgb

    if(!color) return null

    if(!!this.isHex(color)){
      rgb = this.hexToArray(color)
    }
    else if(!!this.isRGB(color)){
      rgb = this.rgbToArray(color)
    }
    else if(!!this.isRGBA(color)){
      rgb = this.rgbToArray(color)
    }
    else if(!!this.isVar(color)){
      return `var(--${color})`
    }

    return !!rgb ? `${rgb.r},${rgb.g},${rgb.b}` : null
  }
}

Vue.prototype.$color = color