import { Text, View, Button, TextInput } from 'react-native';
import {useState} from 'react';

export default function Home() {

	const [balance, setBalance] = useState(20000);
	const [amount, setAmount] = useState('');	

  return (
    <View style={{ marginTop: 50, padding: 20 }}>
      <Text style={{ fontSize: 24, color: "white"}}>Balance: Rp {balance}</Text>

	<TextInput
        placeholder="Masukkan jumlah"
        placeholderTextColor="gray"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          padding: 10,
          marginTop: 20,
          color: 'white'
        }}
      />

       <View style={{ marginTop: 20 }}>
        <Button 
          title="Add Income" 
          onPress={() => {
            setBalance(balance + parseInt(amount || 0));
            setAmount('');
          }} 
        />
      </View>

      <View style={{ marginTop: 10 }}>
        <Button 
          title="Add Expense" 
          onPress={() => {
            setBalance(balance - parseInt(amount || 0));
            setAmount('');
          }} 
        />
      </View>
    </View>
  );
}