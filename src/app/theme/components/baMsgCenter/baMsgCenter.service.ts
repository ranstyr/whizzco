import {Injectable} from '@angular/core'

@Injectable()
export class BaMsgCenterService {

  private _notifications = [
    {
      name: 'Vlad',
      text: 'Freighticket Admin posted a new article.',
      time: '1 min ago'
    },
    {
      name: 'Kostya',
      text: 'New Cash Flow Report was generated.',
      time: '2 hrs ago'
    },
    {
      name: 'Andrey',
      text: 'New Var report generated.',
      time: '1 day ago'
    },
    {
      name: 'Nasta',
      text: 'General ledger report uploaded.',
      time: '2 days ago'
    }
  ];

  private _messages = [
    {
      name: 'Nasta',
      text: 'After you get up and running, you can place questions on the blog',
      time: '1 min ago'
    },
    {
      name: 'Vlad',
      text: 'Freighticket Admin support team will contact you shortly',
      time: '2 hrs ago'
    },
    {
      name: 'Kostya',
      text: 'Want to request new reports? Here\'s how.',
      time: '10 hrs ago'
    },
    {
      name: 'Nasta',
      text: 'Get to know who we are - from the inside out. From our history and culture, to the...',
      time: '1 day ago'
    },
    {
      name: 'Kostya',
      text: 'Need some support to reach your goals? Apply for scholarships across a variety of...',
      time: '2 days ago'
    },
    {
      name: 'Vlad',
      text: 'Wrap the dropdown\'s trigger and the dropdown menu within .dropdown, or...',
      time: '1 week ago'
    }
  ];

  public getMessages():Array<Object> {
    return this._messages;
  }

  public getNotifications():Array<Object> {
    return this._notifications;
  }
}
