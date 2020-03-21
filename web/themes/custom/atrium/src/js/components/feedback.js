(function($) {
  "use strict";

  Drupal.behaviors.feedback = {
    attach: function() {
      const $feedback_trigger = $('[data-feedback^="trigger"]');
      const $feedback_container = $('[data-feedback="container"]');
      const $feedback_dialog = $('[data-feedback="dialog"]');
      const $feedback_confirmation = $(
        '[data-feedback="container"] .webform-confirmation'
      );

      const feedbackOpen = () => {
        $feedback_dialog.attr("open", "open");
        $feedback_container.attr("open", "open");
      };

      const feedbackDismiss = () => {
        $feedback_container.hide();
      };

      const feedbackDismissPath = () => {
        return sessionStorage.feedback_dismissed_page ==
          window.location.pathname
          ? true
          : false;
      };

      const feedbackConfirmed = () => {
        return $feedback_confirmation.length > 0 ? true : false;
      };

      if (feedbackConfirmed() == true) {
        if (feedbackDismissPath() == true) {
          feedbackDismiss();
        } else {
          $feedback_dialog.removeAttr("style");
          feedbackOpen();
        }
      }

      $feedback_trigger.on("click", function(e) {
        e.preventDefault;
        if ($feedback_dialog.attr("open")) {
          if (
            feedbackConfirmed() &&
            $(this).attr("data-feedback") == "trigger-close"
          ) {
            sessionStorage.feedback_dismissed_page = window.location.pathname;
            feedbackDismiss();
          } else {
            $feedback_container.css("transition", "all .2s");
            $feedback_dialog.removeAttr("open");
            $feedback_container.removeAttr("open");
          }
        } else {
          feedbackOpen();
        }
      });
    }
  };
})(jQuery, Drupal);