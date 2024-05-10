import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AdminRegisterInput: AdminRegisterInput;
  AdminRegisterOutput: ResolverTypeWrapper<AdminRegisterOutput>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  String_comparison_exp: String_Comparison_Exp;
  admin: ResolverTypeWrapper<Admin>;
  admin_aggregate: ResolverTypeWrapper<Admin_Aggregate>;
  admin_aggregate_fields: ResolverTypeWrapper<Admin_Aggregate_Fields>;
  admin_bool_exp: Admin_Bool_Exp;
  admin_constraint: Admin_Constraint;
  admin_insert_input: Admin_Insert_Input;
  admin_max_fields: ResolverTypeWrapper<Admin_Max_Fields>;
  admin_min_fields: ResolverTypeWrapper<Admin_Min_Fields>;
  admin_mutation_response: ResolverTypeWrapper<Admin_Mutation_Response>;
  admin_on_conflict: Admin_On_Conflict;
  admin_order_by: Admin_Order_By;
  admin_pk_columns_input: Admin_Pk_Columns_Input;
  admin_select_column: Admin_Select_Column;
  admin_set_input: Admin_Set_Input;
  admin_update_column: Admin_Update_Column;
  menu: ResolverTypeWrapper<Menu>;
  menu_aggregate: ResolverTypeWrapper<Menu_Aggregate>;
  menu_aggregate_fields: ResolverTypeWrapper<Menu_Aggregate_Fields>;
  menu_avg_fields: ResolverTypeWrapper<Menu_Avg_Fields>;
  menu_bool_exp: Menu_Bool_Exp;
  menu_constraint: Menu_Constraint;
  menu_inc_input: Menu_Inc_Input;
  menu_insert_input: Menu_Insert_Input;
  menu_max_fields: ResolverTypeWrapper<Menu_Max_Fields>;
  menu_min_fields: ResolverTypeWrapper<Menu_Min_Fields>;
  menu_mutation_response: ResolverTypeWrapper<Menu_Mutation_Response>;
  menu_on_conflict: Menu_On_Conflict;
  menu_order_by: Menu_Order_By;
  menu_pk_columns_input: Menu_Pk_Columns_Input;
  menu_select_column: Menu_Select_Column;
  menu_set_input: Menu_Set_Input;
  menu_stddev_fields: ResolverTypeWrapper<Menu_Stddev_Fields>;
  menu_stddev_pop_fields: ResolverTypeWrapper<Menu_Stddev_Pop_Fields>;
  menu_stddev_samp_fields: ResolverTypeWrapper<Menu_Stddev_Samp_Fields>;
  menu_sum_fields: ResolverTypeWrapper<Menu_Sum_Fields>;
  menu_update_column: Menu_Update_Column;
  menu_var_pop_fields: ResolverTypeWrapper<Menu_Var_Pop_Fields>;
  menu_var_samp_fields: ResolverTypeWrapper<Menu_Var_Samp_Fields>;
  menu_variance_fields: ResolverTypeWrapper<Menu_Variance_Fields>;
  mutation_root: ResolverTypeWrapper<{}>;
  numeric: ResolverTypeWrapper<Scalars['numeric']['output']>;
  numeric_comparison_exp: Numeric_Comparison_Exp;
  order_by: Order_By;
  query_root: ResolverTypeWrapper<{}>;
  subscription_root: ResolverTypeWrapper<{}>;
  uuid: ResolverTypeWrapper<Scalars['uuid']['output']>;
  uuid_comparison_exp: Uuid_Comparison_Exp;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AdminRegisterInput: AdminRegisterInput;
  AdminRegisterOutput: AdminRegisterOutput;
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  String: Scalars['String']['output'];
  String_comparison_exp: String_Comparison_Exp;
  admin: Admin;
  admin_aggregate: Admin_Aggregate;
  admin_aggregate_fields: Admin_Aggregate_Fields;
  admin_bool_exp: Admin_Bool_Exp;
  admin_insert_input: Admin_Insert_Input;
  admin_max_fields: Admin_Max_Fields;
  admin_min_fields: Admin_Min_Fields;
  admin_mutation_response: Admin_Mutation_Response;
  admin_on_conflict: Admin_On_Conflict;
  admin_order_by: Admin_Order_By;
  admin_pk_columns_input: Admin_Pk_Columns_Input;
  admin_set_input: Admin_Set_Input;
  menu: Menu;
  menu_aggregate: Menu_Aggregate;
  menu_aggregate_fields: Menu_Aggregate_Fields;
  menu_avg_fields: Menu_Avg_Fields;
  menu_bool_exp: Menu_Bool_Exp;
  menu_inc_input: Menu_Inc_Input;
  menu_insert_input: Menu_Insert_Input;
  menu_max_fields: Menu_Max_Fields;
  menu_min_fields: Menu_Min_Fields;
  menu_mutation_response: Menu_Mutation_Response;
  menu_on_conflict: Menu_On_Conflict;
  menu_order_by: Menu_Order_By;
  menu_pk_columns_input: Menu_Pk_Columns_Input;
  menu_set_input: Menu_Set_Input;
  menu_stddev_fields: Menu_Stddev_Fields;
  menu_stddev_pop_fields: Menu_Stddev_Pop_Fields;
  menu_stddev_samp_fields: Menu_Stddev_Samp_Fields;
  menu_sum_fields: Menu_Sum_Fields;
  menu_var_pop_fields: Menu_Var_Pop_Fields;
  menu_var_samp_fields: Menu_Var_Samp_Fields;
  menu_variance_fields: Menu_Variance_Fields;
  mutation_root: {};
  numeric: Scalars['numeric']['output'];
  numeric_comparison_exp: Numeric_Comparison_Exp;
  query_root: {};
  subscription_root: {};
  uuid: Scalars['uuid']['output'];
  uuid_comparison_exp: Uuid_Comparison_Exp;
};

export type CachedDirectiveArgs = {
  refresh?: Scalars['Boolean']['input'];
  ttl?: Scalars['Int']['input'];
};

export type CachedDirectiveResolver<Result, Parent, ContextType = any, Args = CachedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AdminRegisterOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['AdminRegisterOutput'] = ResolversParentTypes['AdminRegisterOutput']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminResolvers<ContextType = any, ParentType extends ResolversParentTypes['admin'] = ResolversParentTypes['admin']> = {
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Admin_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['admin_aggregate'] = ResolversParentTypes['admin_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['admin_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['admin']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Admin_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['admin_aggregate_fields'] = ResolversParentTypes['admin_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Admin_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['admin_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['admin_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Admin_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['admin_max_fields'] = ResolversParentTypes['admin_max_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Admin_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['admin_min_fields'] = ResolversParentTypes['admin_min_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Admin_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['admin_mutation_response'] = ResolversParentTypes['admin_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['admin']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuResolvers<ContextType = any, ParentType extends ResolversParentTypes['menu'] = ResolversParentTypes['menu']> = {
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ingredients?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  weight?: Resolver<ResolversTypes['numeric'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Menu_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['menu_aggregate'] = ResolversParentTypes['menu_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['menu_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['menu']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Menu_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['menu_aggregate_fields'] = ResolversParentTypes['menu_aggregate_fields']> = {
  avg?: Resolver<Maybe<ResolversTypes['menu_avg_fields']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Menu_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['menu_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['menu_min_fields']>, ParentType, ContextType>;
  stddev?: Resolver<Maybe<ResolversTypes['menu_stddev_fields']>, ParentType, ContextType>;
  stddev_pop?: Resolver<Maybe<ResolversTypes['menu_stddev_pop_fields']>, ParentType, ContextType>;
  stddev_samp?: Resolver<Maybe<ResolversTypes['menu_stddev_samp_fields']>, ParentType, ContextType>;
  sum?: Resolver<Maybe<ResolversTypes['menu_sum_fields']>, ParentType, ContextType>;
  var_pop?: Resolver<Maybe<ResolversTypes['menu_var_pop_fields']>, ParentType, ContextType>;
  var_samp?: Resolver<Maybe<ResolversTypes['menu_var_samp_fields']>, ParentType, ContextType>;
  variance?: Resolver<Maybe<ResolversTypes['menu_variance_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Menu_Avg_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['menu_avg_fields'] = ResolversParentTypes['menu_avg_fields']> = {
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Menu_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['menu_max_fields'] = ResolversParentTypes['menu_max_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ingredients?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Menu_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['menu_min_fields'] = ResolversParentTypes['menu_min_fields']> = {
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ingredients?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Menu_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['menu_mutation_response'] = ResolversParentTypes['menu_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['menu']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Menu_Stddev_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['menu_stddev_fields'] = ResolversParentTypes['menu_stddev_fields']> = {
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Menu_Stddev_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['menu_stddev_pop_fields'] = ResolversParentTypes['menu_stddev_pop_fields']> = {
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Menu_Stddev_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['menu_stddev_samp_fields'] = ResolversParentTypes['menu_stddev_samp_fields']> = {
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Menu_Sum_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['menu_sum_fields'] = ResolversParentTypes['menu_sum_fields']> = {
  price?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['numeric']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Menu_Var_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['menu_var_pop_fields'] = ResolversParentTypes['menu_var_pop_fields']> = {
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Menu_Var_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['menu_var_samp_fields'] = ResolversParentTypes['menu_var_samp_fields']> = {
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Menu_Variance_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['menu_variance_fields'] = ResolversParentTypes['menu_variance_fields']> = {
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Mutation_RootResolvers<ContextType = any, ParentType extends ResolversParentTypes['mutation_root'] = ResolversParentTypes['mutation_root']> = {
  adminRegister?: Resolver<Maybe<ResolversTypes['AdminRegisterOutput']>, ParentType, ContextType, RequireFields<Mutation_RootAdminRegisterArgs, 'admin'>>;
  delete_admin?: Resolver<Maybe<ResolversTypes['admin_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_AdminArgs, 'where'>>;
  delete_admin_by_pk?: Resolver<Maybe<ResolversTypes['admin']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Admin_By_PkArgs, 'id'>>;
  delete_menu?: Resolver<Maybe<ResolversTypes['menu_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_MenuArgs, 'where'>>;
  delete_menu_by_pk?: Resolver<Maybe<ResolversTypes['menu']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Menu_By_PkArgs, 'id'>>;
  insert_admin?: Resolver<Maybe<ResolversTypes['admin_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_AdminArgs, 'objects'>>;
  insert_admin_one?: Resolver<Maybe<ResolversTypes['admin']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Admin_OneArgs, 'object'>>;
  insert_menu?: Resolver<Maybe<ResolversTypes['menu_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_MenuArgs, 'objects'>>;
  insert_menu_one?: Resolver<Maybe<ResolversTypes['menu']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Menu_OneArgs, 'object'>>;
  update_admin?: Resolver<Maybe<ResolversTypes['admin_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_AdminArgs, 'where'>>;
  update_admin_by_pk?: Resolver<Maybe<ResolversTypes['admin']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Admin_By_PkArgs, 'pk_columns'>>;
  update_menu?: Resolver<Maybe<ResolversTypes['menu_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_MenuArgs, 'where'>>;
  update_menu_by_pk?: Resolver<Maybe<ResolversTypes['menu']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Menu_By_PkArgs, 'pk_columns'>>;
};

export interface NumericScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['numeric'], any> {
  name: 'numeric';
}

export type Query_RootResolvers<ContextType = any, ParentType extends ResolversParentTypes['query_root'] = ResolversParentTypes['query_root']> = {
  admin?: Resolver<Array<ResolversTypes['admin']>, ParentType, ContextType, Partial<Query_RootAdminArgs>>;
  admin_aggregate?: Resolver<ResolversTypes['admin_aggregate'], ParentType, ContextType, Partial<Query_RootAdmin_AggregateArgs>>;
  admin_by_pk?: Resolver<Maybe<ResolversTypes['admin']>, ParentType, ContextType, RequireFields<Query_RootAdmin_By_PkArgs, 'id'>>;
  menu?: Resolver<Array<ResolversTypes['menu']>, ParentType, ContextType, Partial<Query_RootMenuArgs>>;
  menu_aggregate?: Resolver<ResolversTypes['menu_aggregate'], ParentType, ContextType, Partial<Query_RootMenu_AggregateArgs>>;
  menu_by_pk?: Resolver<Maybe<ResolversTypes['menu']>, ParentType, ContextType, RequireFields<Query_RootMenu_By_PkArgs, 'id'>>;
};

export type Subscription_RootResolvers<ContextType = any, ParentType extends ResolversParentTypes['subscription_root'] = ResolversParentTypes['subscription_root']> = {
  admin?: SubscriptionResolver<Array<ResolversTypes['admin']>, "admin", ParentType, ContextType, Partial<Subscription_RootAdminArgs>>;
  admin_aggregate?: SubscriptionResolver<ResolversTypes['admin_aggregate'], "admin_aggregate", ParentType, ContextType, Partial<Subscription_RootAdmin_AggregateArgs>>;
  admin_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['admin']>, "admin_by_pk", ParentType, ContextType, RequireFields<Subscription_RootAdmin_By_PkArgs, 'id'>>;
  menu?: SubscriptionResolver<Array<ResolversTypes['menu']>, "menu", ParentType, ContextType, Partial<Subscription_RootMenuArgs>>;
  menu_aggregate?: SubscriptionResolver<ResolversTypes['menu_aggregate'], "menu_aggregate", ParentType, ContextType, Partial<Subscription_RootMenu_AggregateArgs>>;
  menu_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['menu']>, "menu_by_pk", ParentType, ContextType, RequireFields<Subscription_RootMenu_By_PkArgs, 'id'>>;
};

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['uuid'], any> {
  name: 'uuid';
}

export type Resolvers<ContextType = any> = {
  AdminRegisterOutput?: AdminRegisterOutputResolvers<ContextType>;
  admin?: AdminResolvers<ContextType>;
  admin_aggregate?: Admin_AggregateResolvers<ContextType>;
  admin_aggregate_fields?: Admin_Aggregate_FieldsResolvers<ContextType>;
  admin_max_fields?: Admin_Max_FieldsResolvers<ContextType>;
  admin_min_fields?: Admin_Min_FieldsResolvers<ContextType>;
  admin_mutation_response?: Admin_Mutation_ResponseResolvers<ContextType>;
  menu?: MenuResolvers<ContextType>;
  menu_aggregate?: Menu_AggregateResolvers<ContextType>;
  menu_aggregate_fields?: Menu_Aggregate_FieldsResolvers<ContextType>;
  menu_avg_fields?: Menu_Avg_FieldsResolvers<ContextType>;
  menu_max_fields?: Menu_Max_FieldsResolvers<ContextType>;
  menu_min_fields?: Menu_Min_FieldsResolvers<ContextType>;
  menu_mutation_response?: Menu_Mutation_ResponseResolvers<ContextType>;
  menu_stddev_fields?: Menu_Stddev_FieldsResolvers<ContextType>;
  menu_stddev_pop_fields?: Menu_Stddev_Pop_FieldsResolvers<ContextType>;
  menu_stddev_samp_fields?: Menu_Stddev_Samp_FieldsResolvers<ContextType>;
  menu_sum_fields?: Menu_Sum_FieldsResolvers<ContextType>;
  menu_var_pop_fields?: Menu_Var_Pop_FieldsResolvers<ContextType>;
  menu_var_samp_fields?: Menu_Var_Samp_FieldsResolvers<ContextType>;
  menu_variance_fields?: Menu_Variance_FieldsResolvers<ContextType>;
  mutation_root?: Mutation_RootResolvers<ContextType>;
  numeric?: GraphQLScalarType;
  query_root?: Query_RootResolvers<ContextType>;
  subscription_root?: Subscription_RootResolvers<ContextType>;
  uuid?: GraphQLScalarType;
};

export type DirectiveResolvers<ContextType = any> = {
  cached?: CachedDirectiveResolver<any, any, ContextType>;
};

export type InsertAdminMutationVariables = Exact<{
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
}>;


export type InsertAdminMutation = { __typename?: 'mutation_root', insert_admin_one?: { __typename?: 'admin', id: any } | null };


export const InsertAdminDocument = gql`
    mutation InsertAdmin($password: String!, $username: String!) {
  insert_admin_one(object: {password: $password, username: $username}) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    InsertAdmin(variables: InsertAdminMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<InsertAdminMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<InsertAdminMutation>(InsertAdminDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'InsertAdmin', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;