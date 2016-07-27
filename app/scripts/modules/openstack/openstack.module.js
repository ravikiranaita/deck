'use strict';

let angular = require('angular');

require('./logo/openstack.logo.less');

// load all templates into the $templateCache
var templates = require.context('./', true, /\.html$/);
_.forEach(templates.keys(), function(key) {
  templates(key);
});

module.exports = angular.module('spinnaker.openstack', [
  require('./serverGroup/configure/ServerGroupCommandBuilder.js'),
  require('./serverGroup/configure/serverGroup.configure.openstack.module.js'),
  require('./serverGroup/configure/wizard/Clone.controller.js'),
  require('./serverGroup/serverGroup.transformer.js'),
  require('./securityGroup/securityGroup.reader.js'),
  require('./securityGroup/configure/configure.openstack.module.js'),
  require('./securityGroup/details/details.controller.js'),
  require('./securityGroup/transformer.js'),
  require('./validation/applicationName.validator.js'),
  require('./cache/cacheConfigurer.service.js'),
  require('../core/cloudProvider/cloudProvider.registry.js'),
  require('./loadBalancer/configure/configure.openstack.module.js'),
  require('./loadBalancer/details/details.openstack.module.js'),
  require('./loadBalancer/transformer.js'),
  require('../core/subnet/subnet.module.js'),
  require('./common/selectField.component.js'),
  require('./search/resultFormatter.js'),
])
  .config(function(cloudProviderRegistryProvider) {
    cloudProviderRegistryProvider.registerProvider('openstack', {
      name: 'openstack',
      logo: {
        path: require('./logo/openstack.logo.png')
      },
      cache: {
        configurer: 'openstackCacheConfigurer',
      },
      search: {
        resultFormatter: 'openstackSearchResultFormatter',
      },
      securityGroup: {
        reader: 'openstackSecurityGroupReader',
        transformer: 'openstackSecurityGroupTransformer',
        detailsTemplateUrl: require('./securityGroup/details/details.html'),
        detailsController: 'openstackSecurityGroupDetailsController',
        createSecurityGroupTemplateUrl: require('./securityGroup/configure/wizard/createWizard.html'),
        createSecurityGroupController: 'openstackUpsertSecurityGroupController',
      },
      serverGroup: {
        transformer: 'openstackServerGroupTransformer',
        cloneServerGroupController: 'openstackCloneServerGroupCtrl',
        cloneServerGroupTemplateUrl: require('./serverGroup/configure/wizard/serverGroupWizard.html'),
        commandBuilder: 'openstackServerGroupCommandBuilder',
        configurationService: 'openstackServerGroupConfigurationService',
      },
      loadBalancer: {
        transformer: 'openstackLoadBalancerTransformer',
        detailsTemplateUrl: require('./loadBalancer/details/details.html'),
        detailsController: 'openstackLoadBalancerDetailsController',
        createLoadBalancerTemplateUrl: require('./loadBalancer/configure/wizard/createWizard.html'),
        createLoadBalancerController: 'openstackUpsertLoadBalancerController',
      }
    });
  });
