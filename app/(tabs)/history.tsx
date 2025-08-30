import { deleteSession, getAllSessions,updateSession } from '@/database';
import { Session, TimerContext } from '@/context/TimerContext';
import  {formatDateWithDay,formatTime12Hour,formatTime}  from '@/utils/formatTime';
import { useFocusEffect } from 'expo-router';
import { useCallback, useContext, useMemo, useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, SectionList } from 'react-native';
import { AppColors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import EditSessionModal from '@/components/EditSessionModal';

export default function History() {
  const [sessions, setSessions] = useState([]);
  const [filter, setFilter] = useState<'day' | 'week' | 'month' | 'all'>('all');
  const {openEditModal,sessionToEdit,isEditModalVisible,categories,closeEditModal,handleSessionEdit} = useContext(TimerContext)
  // Fetches data whenever the screen is focused or the filter changes
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        const data = await getAllSessions(filter);
        setSessions(data);
      };
      loadData();
    }, [filter])
  );
  const section = useMemo(()=>{
  const sectionByDay: { [key: string]: Session[] } = {}; 
    sessions.forEach((session)=>{
      const dateKey = formatDateWithDay(new Date(session.end_time))
      if(!sectionByDay[dateKey]){
        sectionByDay[dateKey] = []
      }

      sectionByDay[dateKey].push(session)
     
    })
     return Object.entries(sectionByDay).map(([title,data])=>({
        title,data
      }))
  },[sessions])
  // Calculates the summary only when the sessions list changes
  const summary = useMemo(() => {
    const categoryTotals: { [key: string]: number } = {};
    sessions.forEach((session) => {
      if (session.selectedCategory) {
        categoryTotals[session.selectedCategory] =
          (categoryTotals[session.selectedCategory] || 0) + session.duration;
      }
    });
    return categoryTotals;
  }, [sessions]);

  // Handles deleting a session from the DB and the UI
  const handleDelete = (id: number) => {
    deleteSession(id);
    setSessions((currentSessions) =>
      currentSessions.filter((session) => session.id !== id)
    );
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={section}
        keyExtractor={(item) => item.id.toString()}
        renderSectionHeader={({section:{title}})=>(
          <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
        )}
        ListHeaderComponent={
          <>
            <View style={styles.filterContainer}>
              <TouchableOpacity 
                style={[styles.filterButton, filter === 'day' && styles.filterButtonActive]} 
                onPress={() => setFilter('day')}>
                <Text style={[styles.filterButtonText, filter === 'day' && styles.filterButtonTextActive]}>Daily</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.filterButton, filter === 'week' && styles.filterButtonActive]} 
                onPress={() => setFilter('week')}>
                <Text style={[styles.filterButtonText, filter === 'week' && styles.filterButtonTextActive]}>Weekly</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.filterButton, filter === 'month' && styles.filterButtonActive]} 
                onPress={() => setFilter('month')}>
                <Text style={[styles.filterButtonText, filter === 'month' && styles.filterButtonTextActive]}>Monthly</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]} 
                onPress={() => setFilter('all')}>
                <Text style={[styles.filterButtonText, filter === 'all' && styles.filterButtonTextActive]}>All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.summaryContainer}>
              <Text style={styles.listTitle}>Summary</Text>
              {Object.entries(summary).map(([category, duration]) => (
                <View key={category} style={styles.summaryItem}>
                  <Text style={styles.summaryCategory}>{category}:</Text>
                  <Text style={styles.summaryDuration}>{formatTime(duration)}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.listTitle}>All Sessions</Text>
          </>
        }
        renderItem={({ item }) => {
          const endTime = new Date(item.end_time);
          const startTime = new Date(endTime.getTime() - item.duration * 1000);
          
          return (
            <View style={styles.itemContainer}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemCategory}>{item.selectedCategory}</Text>
                {item.description ? (
                  <Text style={styles.itemDescription}>{item.description}</Text>
                ) : null}
                <Text style={styles.itemDuration}>{formatTime(item.duration)}</Text>
                <Text style={styles.itemTimestamp}>
          {formatDateWithDay(startTime)}
        </Text>
        <Text style={styles.itemTimestamp}>
          {formatTime12Hour(startTime)} - {formatTime12Hour(endTime)}
        </Text>
              </View>
<View style={styles.actionButtons}> 
  <TouchableOpacity onPress={() => openEditModal(item)}>
    <MaterialIcons name="edit" size={24} color={AppColors.textSecondary} />
  </TouchableOpacity>
  <TouchableOpacity onPress={() => handleDelete(item.id)}>
    <MaterialIcons name="delete" size={24} color={AppColors.danger} />
  </TouchableOpacity>
</View>

            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
       {sessionToEdit && (
      <EditSessionModal
        visible={isEditModalVisible}
        onClose={closeEditModal}
        session={sessionToEdit}
        onSave={handleSessionEdit}
        categories={categories} // You'll need access to the categories list
      />
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  actionButtons: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 20, // This adds space between the icons
},
sectionHeader: {
  backgroundColor: AppColors.background,
  padding: 12,
},
sectionHeaderText: {
  color: AppColors.text,
  fontSize: 18,
  fontWeight: 'bold',
},
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: AppColors.surface,
    paddingVertical: 12,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  filterButtonActive: {
    backgroundColor: AppColors.primary,
  },
  filterButtonText: {
    color: AppColors.text,
    fontWeight: "600",
  },
  filterButtonTextActive: {
    color: AppColors.background,
  },
  summaryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: AppColors.surface,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: AppColors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  summaryCategory: {
    fontWeight: '500',
    color: AppColors.text,
  },
  summaryDuration: {
    color: AppColors.textSecondary,
  },
  itemContainer: {
    backgroundColor: AppColors.surface,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AppColors.text,
  },
  itemDescription: {
    color: AppColors.textSecondary,
    marginTop: 2,
  },
  itemDuration: {
    marginTop: 4,
    color: AppColors.gold,
  },
  itemTimestamp: {
    color: AppColors.textSecondary,
    fontSize: 12,
    marginTop: 8,
  },
  separator: {
    height: 1,
    backgroundColor: AppColors.background,
  },
});