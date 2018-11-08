/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import storage from './src/Storage';

type Props = {};
export default class App extends Component<Props> {

  constructor(props){
    super(props);
    this.state={
        data:'',
        city:null
    }
  }

    componentDidMount() {
        let obj = {}
        obj.name = '张三'
        obj.age = 20
        obj.sex = 'man'
        // 存
        // storage.save('userInfo', obj)
        // // 取
        // storage.load('userInfo', (data) => {
        //     alert(data.name)
        // })
    }

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.welcome}>{this.state.data}-{this.state.city}</Text>
        <Text style={styles.instructions}
              onPress={this.createData.bind(this)}
        >存数据</Text>
        <Text style={styles.instructions}
              onPress={this.upData.bind(this)}
        >更新数据</Text>
        <Text style={styles.instructions}
              onPress={this.inquireData.bind(this)}
        >查询数据</Text>
        <Text style={styles.instructions}
              onPress={this.removeData.bind(this)}
        >删除数据</Text>
      </View>
    );
  }

    // 增加
    createData() {
        // 使用key保存数据
        storage.save({
            key:'storageTest',    // 注意:请不要在key中使用_下划线符号!
            rawData: {
                name:'赵王',
                city:'北京'
            },

            // 设为null,则不过期,这里会覆盖初始化的时效
            expires: 1000 * 3600
        });
    }



    // 查询
    inquireData() {
        storage.load({
            key:'storageTest',

            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,

            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true,

            // 你还可以给sync方法传递额外的参数
            syncParams: {
                extraFetchOptions: {
                    // 各种参数
                },
                someFlag: true,
            },
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
            // 你只能在then这个方法内继续处理ret数据
            // 而不能在then以外处理
            // 也没有办法“变成”同步返回
            // 你也可以使用“看似”同步的async/await语法

            // 更新data值
            this.setState({
                data: ret.name,
                city: ret.city
            });

        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // 更新
                    this.setState({
                        data:'数据为空',
                        city:'地址为空'
                    });

                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        })
    }

    // 更新
    upData() {
        // 重新存储即可
        storage.save({
            key:'storageTest',    // 注意:请不要在key中使用_下划线符号!
            rawData: {
                name:'魏王',
                city:'天津'
            },

            // 设为null,则不过期,这里会覆盖初始化的时效
            expires: 1000 * 3600
        });
    }

    // 删除
    removeData() {
        // 删除单个数据
        storage.remove({
            key: 'storageTest'
        });

        // storage.remove({
        //     key: 'react-native-storage-test',
        //     name:'吉泽明步'
        // });

//         // !! 清空map，移除所有"key-id"数据（但会保留只有key的数据）
//         storage.clearMap();
//
//         // 获取某个key下的所有id
//         storage.getIdsForKey('user').then(ids => {
//             console.log(ids);
//         });
//
//         // 获取某个key下的所有数据
//         storage.getAllDataForKey('user').then(users => {
//             console.log(users);
//         });
//
//         // !! 清除某个key下的所有数据
//         storage.clearMapForKey('user');
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 30,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 30,
  },
});
