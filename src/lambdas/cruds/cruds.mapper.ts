import {
    attribute,
    hashKey,
    table,

} from '@aws/dynamodb-data-mapper-annotations';


@table('CrudTable')
export class CrudTable {

    @hashKey()
    id: string;

    @attribute()
    title: string;

    @attribute()
    createdAt: string;

    @attribute()
    updatedAt: string;

}
