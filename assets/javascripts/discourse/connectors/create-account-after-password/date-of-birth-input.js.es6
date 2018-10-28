import { getOwner } from 'discourse-common/lib/get-owner';

const doubleDigit = function(n) {
  return Number(n) > 9 ? "" + n: "0" + n;
}

export default {
  setupComponent(attrs, component) {
    const controller = getOwner(this).lookup('controller:create-account');

    component.setProperties({
      days: _.range(1, 32),
      months: moment.months().map((month, index) => {
        return { name: month, value: index + 1 };
      }),
      years: _.range(1940, 2013).reverse()
    });

    const validateDateOfBirth = function() {
      const day = component.get("day");
      const month = component.get("month");
      const year = component.get("year");

      if ($.isNumeric(day) && $.isNumeric(month) && $.isNumeric(year)) {
        const dateOfBirth = moment(`${year}-${doubleDigit(month)}-${doubleDigit(day)}`);
        controller.set('dateOfBirth', dateOfBirth);
      }
    };

    component.addObserver("day", validateDateOfBirth);
    component.addObserver("month", validateDateOfBirth);
    component.addObserver("year", validateDateOfBirth);

    controller.addObserver('ageValidation.failed', function() {
      component.set('ageValidation', controller.get('ageValidation'));
    });
  },

  actions: {
    toggleTip() {
      this.toggleTip('showTip');
    }
  }
}
