import React, {View, Text} from 'react-native'
import Button from '../../components/button'
import Input from '../../components/master-data/Input'
import Table from '../../components/master-data/Table'

const TransaksiScreen = () => {
    return (
        <View style={{flex: 1}}>
            <Input title='Transaksi'/>
            <View style={{alignItems: 'center'}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 180}}>
                    <Button name='Add' bg='green'/>
                    <Button name='Save'/>
                </View>
            </View>
            <Table title='Transaksi'/>
        </View>
    )
}

export default TransaksiScreen